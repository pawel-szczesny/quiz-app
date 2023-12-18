import {ConflictException, Injectable} from '@nestjs/common';
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Quiz} from "./models/quiz.model";
import {Question} from "./models/question.model";
import {Answer} from "./models/answer.model";
import {Participant} from "./models/participant.model";

@Injectable()
export class QuizzesService {
    constructor(@InjectModel(Quiz) private readonly quizModel: typeof Quiz,
                @InjectModel(Participant) private readonly participantModel: typeof Participant) {
    }

    create(createQuizDto: CreateQuizDto) {
        return this.quizModel.create({
            title: createQuizDto.title,
            questions: createQuizDto.questions
        }, {include: [{model: Question, include: [Answer]}]})
    }

    findAll() {
        return this.quizModel.findAll()
    }

    findOne(id: number) {
        return this.quizModel.findOne({
            where: {
                quizId: id
            },
            include: [{model: Question, include: [{model: Answer, attributes: {exclude: ['isCorrect']}}]}]
        })
    }

    async updateParticipants(quizId: number, userId: number) {
        if (!await this.participantModel.findOne({where: {quizId: quizId, userId: userId}})) {
            await this.participantModel.create({userId: userId, quizId: quizId})
        } else {
            throw new ConflictException("user has already joined this quiz");
        }
        return this.findOne(quizId)
    }
}
