import {AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Question} from "./question.model";
import {Quiz} from "./quiz.model";

@Table
export class Answer extends Model {
    @ForeignKey(() => Question)
    questionId: number

    @BelongsTo(() => Question)
    quiz: Question;

    @AutoIncrement
    @PrimaryKey
    @Column
    answerId: number

    @Column
    answer: string;

    @Column
    isCorrect: boolean;
}
