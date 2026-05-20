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
  //create quiz
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
  ): Promise<Quiz | null> {
    return await this.quizRepository
      .createQueryBuilder("quiz")
      .leftJoinAndSelect("quiz.quizQuestions", "quizQuestion")
      .leftJoinAndSelect("quizQuestion.question", "question")
      .leftJoinAndSelect("quizQuestion.questionVersion", "questionVersion")
      .leftJoinAndSelect("questionVersion.options", "option")
      .where("quiz.publicId = :publicId", { publicId })
      .andWhere("quiz.isActive = :isActive", { isActive: true })
      .orderBy("quizQuestion.questionOrder", "ASC")
      .addOrderBy("option.optionOrder", "ASC")
      .getOne();
  }
}
