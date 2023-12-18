import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "./models/user.model";
import {InjectModel} from "@nestjs/sequelize";
import {RegisterUserDto} from "./dto/register-user.dto";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UsersService {
    constructor(private authService: AuthService,
                @InjectModel(User) private readonly userModel: typeof User) {
    }

    create(registerUserDto: RegisterUserDto) {
        return this.userModel.create({
            username: registerUserDto.username,
            password: registerUserDto.password,
            email: registerUserDto.email
        })
    }

    async singIn(username: string, pass: string): Promise<any> {
        const user = await this.findOne(username)
        if (user.password !== pass) {
            throw new UnauthorizedException();
        }
        return this.authService.generateToken(user)
    }

    private async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({
            where: {
                username: username
            }
        })
    }
}
