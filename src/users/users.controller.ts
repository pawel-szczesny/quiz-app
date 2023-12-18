import {Body, Controller, Post} from '@nestjs/common';
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {UsersService} from "./users.service";
import {Public} from "../auth/constants";
import {User} from "./models/user.model";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterUserDto): Promise<User> {
        return this.usersService.create(registerDto)
    }

    @Public()
    @Post('login')
    login(@Body() loginDto: LoginUserDto) {
        return this.usersService.singIn(loginDto.username, loginDto.password);
    }
}
