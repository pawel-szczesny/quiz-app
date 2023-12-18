import {Question} from "../models/question.model";

export class CreateQuizDto {
    title: string;
    questions: Question[];
}




