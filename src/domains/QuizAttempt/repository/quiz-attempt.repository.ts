import { Service } from "typedi";
import { Repository } from "typeorm";

import { AppDataSource } from "../../../db/data-source";

import { QuizAttempt } from "../entity/QuizAttempt.entity";
import { AttemptAnswer } from "../../AttemptAnswer/entity/AttemptAnswer.entity";
import { AttemptAnswerOption } from "../../AttemptAnswerOption/entity/AttemptAnswerOption.entity";
import { QuestionVersion } from "../../QuestionVersion/entity/QuestionVersion.entity";
import { QuestionOption } from "../../QuestionOption/entity/QuestionOption.entity";

@Service()
export class AttemptRepository {
  private readonly attemptRepository: Repository<QuizAttempt>;
  private readonly answerRepository: Repository<AttemptAnswer>;
  private readonly answerOptionRepository: Repository<AttemptAnswerOption>;
  private readonly versionRepository: Repository<QuestionVersion>;
  private readonly optionRepository: Repository<QuestionOption>;

  constructor() {
    this.attemptRepository = AppDataSource.getRepository(QuizAttempt);
    this.answerRepository = AppDataSource.getRepository(AttemptAnswer);
    this.answerOptionRepository =
      AppDataSource.getRepository(AttemptAnswerOption);
    this.versionRepository = AppDataSource.getRepository(QuestionVersion);
    this.optionRepository = AppDataSource.getRepository(QuestionOption);
  }
  //count prev attempts
  public async countUserQuizAttempts(
    userId: number,
    quizId: number,
  ): Promise<number> {
    return await this.attemptRepository.count({
      where: {
        userId,
        quizId,
      },
    });
  }
  //create new attempt
  public async createAttempt(data: Partial<QuizAttempt>): Promise<QuizAttempt> {
    const attempt = this.attemptRepository.create(data);

    return await this.attemptRepository.save(attempt);
  }

  public async findQuestionVersionByPublicId(
    publicId: string,
  ): Promise<QuestionVersion | null> {
    return await this.versionRepository.findOne({
      where: {
        publicId,
      },
    });
  }

  public async findOptionByPublicId(
    publicId: string,
  ): Promise<QuestionOption | null> {
    return await this.optionRepository.findOne({
      where: {
        publicId,
      },
    });
  }

  public async createAnswer(
    data: Partial<AttemptAnswer>,
  ): Promise<AttemptAnswer> {
    const answer = this.answerRepository.create(data);

    return await this.answerRepository.save(answer);
  }

  public async createAnswerOptions(
    data: Partial<AttemptAnswerOption>[],
  ): Promise<AttemptAnswerOption[]> {
    const answerOptions = this.answerOptionRepository.create(data);

    return await this.answerOptionRepository.save(answerOptions);
  }
}
