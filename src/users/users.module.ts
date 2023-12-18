import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../auth/authguard";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        AuthModule
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
