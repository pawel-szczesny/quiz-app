import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table
export class AnsweredQuestion extends Model {
    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column
    questionId: number
}
