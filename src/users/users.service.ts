import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

export interface User {
    userId: string;
    username: string;
    password: string;
    email: string;
}

@Injectable()
export class UsersService {
    constructor(private jwtService: JwtService) {}

    private readonly users = [
        {"userId": "asdasdas", "username": "pawel", "password": "password", "email": "email"}
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => username === username)
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
