import { Repository } from "typeorm";
import { Service } from "typedi";

import { AppDataSource } from "../../../db/data-source";
import { Quiz } from "../entity/Quiz.entity";
import { QuizQuestion } from "../../QuizQuestion/entity/QuizQuestion.entity";

@Service()
export class QuizRepository {
  private readonly quizRepository: Repository<Quiz>;
  private readonly quizQuestionRepository: Repository<QuizQuestion>;

  constructor() {
    this.quizRepository = AppDataSource.getRepository(Quiz);
    this.quizQuestionRepository = AppDataSource.getRepository(QuizQuestion);
  }
  //admin create quiz
  public async createQuiz(data: Partial<Quiz>): Promise<Quiz> {
    const quiz = this.quizRepository.create(data);

    return await this.quizRepository.save(quiz);
  }

  //create quiz que
  public async createQuizQuestions(
    data: Partial<QuizQuestion>[],
  ): Promise<QuizQuestion[]> {
    const quizQuestions = this.quizQuestionRepository.create(data);

    return await this.quizQuestionRepository.save(quizQuestions);
  }

  public async findAllQuizzes(): Promise<Quiz[]> {
    return await this.quizRepository.find({
      where: {
        isActive: true,
      },
      relations: {
        quizQuestions: true,
      },

      order: {
        createdAt: "DESC",
      },
    });
  }
  //quiz joined with quiz que ,que version,que opions
  public async findQuizDetailsByPublicId(
    publicId: string,
    page: number,
    limit: number,
  ) {
    const quiz = await this.quizRepository.findOne({
      where: {
        publicId,
        isActive: true,
      },
    });

    if (!quiz) {
      return null;
    }

    const [quizQuestions, total] = await this.quizQuestionRepository
      .createQueryBuilder("quizQuestion")
      .leftJoinAndSelect("quizQuestion.question", "question")
      .leftJoinAndSelect(
        "question.versions",
        "questionVersion",
        "questionVersion.isLatest = true",
      )
      .leftJoinAndSelect("questionVersion.options", "option")
      .where("quizQuestion.quizId = :quizId", {
        quizId: quiz.id,
      })
      .orderBy("quizQuestion.questionOrder", "ASC")
      .addOrderBy("option.optionOrder", "ASC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      quiz,
      quizQuestions,
      total,
    };
  }

  public async findQuizByPublicId(publicId: string): Promise<Quiz | null> {
    return await this.quizRepository.findOne({
      where: {
        publicId,
        isActive: true,
      },
    });
  }
}
