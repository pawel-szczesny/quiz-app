import {Injectable} from '@nestjs/common';
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Quiz} from "./models/quiz.model";
import {Question} from "./models/question.model";
import {Answer} from "./models/answer.model";

@Injectable()
export class QuizzesService {
    constructor(@InjectModel(Quiz) private readonly quizModel: typeof Quiz) {
    }

    create(createQuizDto: CreateQuizDto) {
        return this.quizModel.create({
            title: createQuizDto.title,
            questions: createQuizDto.questions
        }, {include: [{model: Question, include: [Answer]}]})
    }
}
