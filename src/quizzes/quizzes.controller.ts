import {Body, ConflictException, Controller, Get, Param, Post, Req, Request} from '@nestjs/common';
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {QuizzesService} from "./quizzes.service";
import {Quiz} from "./models/quiz.model";
import {GetQuizzesDto} from "./dto/get-quizzes.dto";
import {UsersService} from "../users/users.service";

@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService, private usersService: UsersService) {
    }

    @Post()
    createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
        return this.quizzesService.create(createQuizDto)
    }

    @Get()
    async getQuizzes(): Promise<GetQuizzesDto> {
        const quizzes = await this.quizzesService.findAll()
        return {
            quizzes: quizzes.map(data => {
                return {title: data.title, quizId: data.quizId}
            })
        }
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
        console.log(user.answeredQuestions.find(a => a.questionId == questionId))
        if (user.answeredQuestions && user.answeredQuestions.find(a => a.questionId == questionId))
            throw new ConflictException("user already answered this question")
        const participant = await this.quizzesService.checkIfUserParticipate(user.userId)
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
    getScore(@Param('id') id: string): string {
        return "OK"
    }

}
