import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/models/user.model";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {
    }

    async generateToken(user: User) {
        const payload = {sub: user.userId, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}

