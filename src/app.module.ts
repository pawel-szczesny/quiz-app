import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { QuizzesController } from './quizzes/quizzes.controller';
import { LeaderboardController } from './leaderboard/leaderboard.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, QuizzesController, LeaderboardController],
  providers: [AppService],
})
export class AppModule {}
