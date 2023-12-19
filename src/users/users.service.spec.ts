import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
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

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, AuthService, JwtService,
        {provide: getModelToken(User), useValue: mockDbCalls},
        {provide: getModelToken(AnsweredQuestion), useValue: mockDbCalls}],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
