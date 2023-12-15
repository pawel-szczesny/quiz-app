import {Body, Controller, Post} from '@nestjs/common';
import {RegisterUserDto} from "./register-user.dto";
import {LoginUserDto} from "./login-user.dto";

@Controller('users')
export class UsersController {
    @Post('register')
    register(@Body() registerDto: RegisterUserDto): string {
        return "OK"
    }

    @Post('login')
    login(@Body() loginDto: LoginUserDto): string {
        return "OK"
    }
}
