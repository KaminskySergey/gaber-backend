import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { AuthDto } from "./dto/auth-dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { verify } from "argon2";
import { Response } from "express";

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = "refreshToken";

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}
  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);
    return {
      user,
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);
    if (oldUser) throw new BadRequestException("User already exists");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto);
    const tokens = await this.issueTokens(user.id);
    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException("Invalid refresh token");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.getById(result.id);

    const tokens = await this.issueTokens(user.id);
    return {
      user,
      ...tokens,
    };
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: "20s",
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) throw new NotFoundException("User not found");

    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException("Invalid password");
    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: process.env.ADD_REFRESH_TOKEN_TO_RESPONSE_DOMAIN,
      expires: expiresIn,
      secure: true,
      // lax if production !!!!!!!!!!!!
      sameSite: "none",
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, "", {
      httpOnly: true,
      domain: process.env.ADD_REFRESH_TOKEN_TO_RESPONSE_DOMAIN,
      expires: new Date(0),
      secure: true,
      // lax if production !!!!!!!!!!!!
      sameSite: "none",
    });
  }
}
