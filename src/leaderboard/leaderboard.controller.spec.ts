import {Test, TestingModule} from '@nestjs/testing';
import {LeaderboardController} from './leaderboard.controller';
import {UsersService} from "../users/users.service";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {getModelToken} from "@nestjs/sequelize";
import {User} from "../users/models/user.model";
import {AnsweredQuestion} from "../users/models/answered.model";

const mockDbCalls = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
};

describe('LeaderboardController', () => {
    let controller: LeaderboardController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, AuthService, JwtService,
                {provide: getModelToken(User), useValue: mockDbCalls},
                {provide: getModelToken(AnsweredQuestion), useValue: mockDbCalls},],
            controllers: [LeaderboardController],
        }).compile();

        controller = module.get<LeaderboardController>(LeaderboardController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
