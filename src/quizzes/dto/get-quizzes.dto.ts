import {Quiz} from "../models/quiz.model";

export class GetQuizzesDto {
    quizzes: { title: string, quizId: number }[]
}

