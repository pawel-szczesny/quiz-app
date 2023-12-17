import {AutoIncrement, Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";


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
}
