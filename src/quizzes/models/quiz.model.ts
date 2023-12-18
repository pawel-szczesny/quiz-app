import {AutoIncrement, Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Question} from "./question.model";
import {Participant} from "./participant.model";

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

    @HasMany(() => Participant, 'quizId')
    participants: Participant[];
}
