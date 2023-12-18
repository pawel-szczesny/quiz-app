import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Quiz} from "./models/quiz.model";
import {Question} from "./models/question.model";
import {Answer} from "./models/answer.model";
import {QuizzesService} from "./quizzes.service";
import {Participant} from "./models/participant.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Quiz, Question, Answer, Participant])
    ],
    providers: [QuizzesService],
    exports: [QuizzesService]
})
export class QuizzesModule {
}
