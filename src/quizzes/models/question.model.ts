import {AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Answer} from "./answer.model";
import {Quiz} from "./quiz.model";

@Table
export class Question extends Model {
    @ForeignKey(() => Quiz)
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz: Quiz;

    @AutoIncrement
    @PrimaryKey
    @Column
    questionId: number;

    @Column
    question: string;

    @HasMany(() => Answer, 'questionId')
    answers: Answer[];
}
