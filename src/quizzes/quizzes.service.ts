import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Quiz} from "./models/quiz.model";
import {Question} from "./models/question.model";
import {Answer} from "./models/answer.model";
import {Participant} from "./models/participant.model";

@Injectable()
export class QuizzesService {
    constructor(@InjectModel(Quiz) private readonly quizModel: typeof Quiz,
                @InjectModel(Participant) private readonly participantModel: typeof Participant,
                @InjectModel(Question) private readonly questionModel: typeof Question) {
    }

    create(createQuizDto: CreateQuizDto) {
        return this.quizModel.create({
            title: createQuizDto.title,
            questions: createQuizDto.questions
        }, {include: [{model: Question, include: [Answer]}]})
    }

    getQuizzes() {
        return this.quizModel.findAll({attributes: ['title', 'quizId']})
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

    async checkAnswer(questionId: number, answerId: number) {
        const question = await this.questionModel.findOne({where: {questionId: questionId}, include: [{model: Answer}]})
        const correctAnswerId = question.answers.find(a => a.isCorrect).answerId //TODO multiple correct answer
        return answerId == correctAnswerId
    }

    async checkIfUserParticipate(userId: number) {
        const participant = await this.participantModel.findOne({where: {userId: userId}})
        if (!participant) {
            throw new NotFoundException("user needs to participate to the quiz before answering the question")
        }
        return participant
    }

    async updateScore(participant: Participant) {
        const updatedScore = participant.score ? participant.score + 1 : 1
        await this.participantModel.update({score: updatedScore}, {where: {userId: participant.userId}})
    }

    async getParticipantsScore(quizId: number) {
        return this.participantModel.findAll({where: {quizId: quizId}})
    }
}
