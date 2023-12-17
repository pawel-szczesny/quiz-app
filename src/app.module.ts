import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersController} from './users/users.controller';
import {QuizzesController} from './quizzes/quizzes.controller';
import {LeaderboardController} from './leaderboard/leaderboard.controller';
import {UsersModule} from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    imports: [
        UsersModule,
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'pass',
            database: 'quiz-app-db',
            autoLoadModels: true,
            synchronize: true
        })
    ],
    controllers: [AppController, UsersController, QuizzesController, LeaderboardController],
    providers: [AppService],
})
export class AppModule {
}
