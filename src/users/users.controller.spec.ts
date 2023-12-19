import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {UsersService} from "./users.service";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {getModelToken} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import {AnsweredQuestion} from "./models/answered.model";

const mockDbCalls = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, AuthService, JwtService,
        {provide: getModelToken(User), useValue: mockDbCalls},
        {provide: getModelToken(AnsweredQuestion), useValue: mockDbCalls}],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
