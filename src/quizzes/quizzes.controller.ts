import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateQuizDto} from "./dto/create-quiz.dto";
import {QuizzesService} from "./quizzes.service";
import {Quiz} from "./models/quiz.model";

@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService) {
    }
    @Post()
    createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
        return this.quizzesService.create(createQuizDto)
    }

    @Get()
    getQuizzes(): string {
        return "OK"
    }

    @Get(':id')
    getQuiz(@Param('id') id: string): string {
        return `OK #${id}`
    }

    @Post(':id/participate')
    joinQuiz(@Param('id') id: string): string {
        return "OK"
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
