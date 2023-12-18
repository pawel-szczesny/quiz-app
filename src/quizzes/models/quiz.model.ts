import {AutoIncrement, Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Question} from "./question.model";

@Table
export class Quiz extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    quizId: number;

    @Column
    title: string;

    @HasMany(() => Question, 'quizId')
    questions: Question[];
}
