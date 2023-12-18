import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Quiz} from "./models/quiz.model";
import {Question} from "./models/question.model";
import {Answer} from "./models/answer.model";
import {QuizzesService} from "./quizzes.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Quiz, Question, Answer])
    ],
    providers: [QuizzesService],
    exports: [QuizzesService]
})
export class QuizzesModule {
}
