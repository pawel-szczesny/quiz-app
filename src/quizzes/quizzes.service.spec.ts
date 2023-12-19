import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './quizzes.service';
import {getModelToken} from "@nestjs/sequelize";
import {Quiz} from "./models/quiz.model";
import {Participant} from "./models/participant.model";
import {Question} from "./models/question.model";

const mockDbCalls = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
};

describe('QuizzesService', () => {
  let service: QuizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizzesService,
        {provide: getModelToken(Quiz), useValue: mockDbCalls},
        {provide: getModelToken(Participant), useValue: mockDbCalls},
        {provide: getModelToken(Question), useValue: mockDbCalls}],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
