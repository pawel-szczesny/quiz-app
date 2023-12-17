import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./authguard";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/user.model";

@Module({
    imports: [
        JwtModule.register({
                global: true,
                secret: jwtConstants.secret,
                signOptions: {expiresIn: '12h'}
            }
        ),
        SequelizeModule.forFeature([User])
    ],
    providers: [
        UsersService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }],
    exports: [UsersService],
})
export class UsersModule {
}
