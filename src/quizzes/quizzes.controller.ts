import {Body, ConflictException, Controller, Get, Param, Post, Req, Request} from '@nestjs/common';
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {QuizzesService} from "./quizzes.service";
import {Quiz} from "./models/quiz.model";
import {UsersService} from "../users/users.service";
import {Participant} from "./models/participant.model";

@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService, private usersService: UsersService) {
    }

    @Post()
    createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
        return this.quizzesService.create(createQuizDto)
    }

    @Get()
    getQuizzes(): Promise<Quiz[]> {
        return this.quizzesService.getQuizzes()
    }

    @Get(':id')
    async getQuiz(@Param('id') id: number): Promise<Quiz> {
        return this.quizzesService.findOne(id)
    }

    @Post(':id/participate')
    async joinQuiz(@Param('id') quizId: number, @Req() request: Request): Promise<Quiz> {
        const user = await this.usersService.findOne(request["user"]["username"])
        return this.quizzesService.updateParticipants(quizId, user.userId)
    }

    @Post(':id/answer/:answerId')
    async submitAnswer(@Param('id') questionId: number, @Param('answerId') answerId: number, @Req() request: Request): Promise<string> {
        const user = await this.usersService.findOne(request["user"]["username"])
        const participant = await this.quizzesService.checkIfUserParticipate(user.userId, questionId)
        if (user.answeredQuestions && user.answeredQuestions.find(a => a.questionId == questionId))
            throw new ConflictException("user already answered this question")
        if (await this.quizzesService.checkAnswer(questionId, answerId)) {
            await this.usersService.updateScore(user)
            await this.quizzesService.updateScore(participant)
            await this.usersService.markAsAnswered(user, questionId)
            return "Bravo! Your answer is correct!"
        } else {
            await this.usersService.resetStreak(user)
            await this.usersService.markAsAnswered(user, questionId)
            return "Unfortunately, this is not a right answer!"
        }
    }

    @Post(':id/score')
    getScore(@Param('id') quizId: number): Promise<Participant[]> {
        return this.quizzesService.getParticipantsScore(quizId)
    }

}
