import {Body, Controller, Get, Param, Post, Req, Request} from '@nestjs/common';
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {QuizzesService} from "./quizzes.service";
import {Quiz} from "./models/quiz.model";
import {GetQuizzesDto} from "./dto/get-quizzes.dto";
import {Question} from "./models/question.model";
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
        return {quizzes: quizzes.map(data => {return {title: data.title, quizId: data.quizId}})}
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

    @Post(':id/answer')
    submitAnswer(@Param('id') id: string, @Body() selectedOptions: Array<string>): string {
        return "OK"
    }

    @Post(':id/score')
    getScore(@Param('id') id: string): string {
        return "OK"
    }

}
