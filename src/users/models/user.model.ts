import {AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {AnsweredQuestion} from "./answered.model";


@Table
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    userId: number;

    @Unique
    @Column
    username: string;

    @Column
    password: string;

    @Column
    email: string;

    @HasMany(() => AnsweredQuestion, 'userId')
    answeredQuestions: AnsweredQuestion[];

    @Column
    totalScore: number;

    @Column
    streakScore: number;
}
