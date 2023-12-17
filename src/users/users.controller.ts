import {Body, Controller, Post} from '@nestjs/common';
import {RegisterUserDto} from "./register-user.dto";
import {LoginUserDto} from "./login-user.dto";
import {UsersService} from "./users.service";
import {Public} from "./constants";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterUserDto): string {
        return "OK"
    }

    @Public()
    @Post('login')
    login(@Body() loginDto: LoginUserDto) {
        return this.usersService.singIn(loginDto.username, loginDto.password);
    }
}
