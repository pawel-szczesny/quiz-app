import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {User} from "./models/user.model";
import {InjectModel} from "@nestjs/sequelize";
import {RegisterUserDto} from "./register-user.dto";

@Injectable()
export class UsersService {
    constructor(private jwtService: JwtService,
                @InjectModel(User) private readonly userModel: typeof User) {}

    create(registerUserDto: RegisterUserDto) {
        return this.userModel.create({
            username: registerUserDto.username,
            password: registerUserDto.password,
            email: registerUserDto.email
        })
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({
            where: {
                username: username
            }
        })
    }

    async singIn(username: string, pass: string): Promise<any> {
        const user = await this.findOne(username)
        if (user.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
