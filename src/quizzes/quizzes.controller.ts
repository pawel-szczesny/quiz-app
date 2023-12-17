import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateQuizDto} from "./create-quiz.dto";

@Controller('quizzes')
export class QuizzesController {
    @Post()
    createQuiz(@Body() createQuizDto: CreateQuizDto): string {
        return "OK"
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
