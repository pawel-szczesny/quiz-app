import {Test, TestingModule} from '@nestjs/testing';
import {QuizzesController} from './quizzes.controller';
import {QuizzesService} from "./quizzes.service";
import {UsersService} from "../users/users.service";
import {getModelToken} from "@nestjs/sequelize";
import {Quiz} from "./models/quiz.model";
import {User} from "../users/models/user.model";
import {Participant} from "./models/participant.model";
import {Question} from "./models/question.model";
import {AnsweredQuestion} from "../users/models/answered.model";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";

const mockDbCalls = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
};

describe('QuizzesController', () => {
    let controller: QuizzesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuizzesService, UsersService, AuthService, JwtService,
                {provide: getModelToken(Quiz), useValue: mockDbCalls},
                {provide: getModelToken(Participant), useValue: mockDbCalls},
                {provide: getModelToken(Question), useValue: mockDbCalls},
                {provide: getModelToken(User), useValue: mockDbCalls},
                {provide: getModelToken(AnsweredQuestion), useValue: mockDbCalls},
            ],
            controllers: [QuizzesController]
        }).compile();

        controller = module.get<QuizzesController>(QuizzesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
