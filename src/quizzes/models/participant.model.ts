import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {Quiz} from "./quiz.model";

@Table
export class Participant extends Model {
    @ForeignKey(() => Quiz)
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz: Quiz;

    @Column
    userId: number;

    @Column
    score: number;
}
