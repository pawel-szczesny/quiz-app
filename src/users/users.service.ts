import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "./models/user.model";
import {InjectModel} from "@nestjs/sequelize";
import {RegisterUserDto} from "./dto/register-user.dto";
import {AuthService} from "../auth/auth.service";
import {AnsweredQuestion} from "./models/answered.model";
import {Answer} from "../quizzes/models/answer.model";

const MAXIMUM_STREAK_SCORE = 3

@Injectable()
export class UsersService {
    constructor(private authService: AuthService,
                @InjectModel(User) private readonly userModel: typeof User,
                @InjectModel(AnsweredQuestion) private readonly answeredQuestionModel: typeof AnsweredQuestion) {
    }

    create(registerUserDto: RegisterUserDto) {
        return this.userModel.create({
            username: registerUserDto.username,
            password: registerUserDto.password,
            email: registerUserDto.email
        })
    }

    async singIn(username: string, pass: string): Promise<any> {
        const user = await this.findOne(username)
        if (user.password !== pass) {
            throw new UnauthorizedException();
        }
        return this.authService.generateToken(user)
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({
            where: {
                username: username
            },
            include: [{model: AnsweredQuestion}]
        })
    }

    async updateScore(user: User) {
        const updatedStreakScore = user.streakScore ? (user.streakScore < MAXIMUM_STREAK_SCORE ? user.streakScore + 1 : MAXIMUM_STREAK_SCORE) : 1
        const updatedTotalScore = user.totalScore ? user.totalScore + 1 : 1

        await this.userModel.update({
            totalScore: updatedTotalScore + updatedStreakScore,
            streakScore: updatedStreakScore
        }, {where: {userId: user.userId}})
    }

    async resetStreak(user: User) {
        await this.userModel.update({streakScore: 0}, {where: {userId: user.userId}})
    }

    async markAsAnswered(user: User, questionId: number) {
        await this.answeredQuestionModel.create({userId: user.userId, questionId: questionId})
    }
}
