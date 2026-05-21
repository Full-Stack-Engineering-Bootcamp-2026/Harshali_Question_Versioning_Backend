import { In, Repository } from "typeorm";
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

    const total = await this.quizQuestionRepository.count({
      where: {
        quizId: quiz.id,
      },
    });

    const rows = await this.quizQuestionRepository
      .createQueryBuilder("quizQuestion")
      .select("quizQuestion.id", "id")
      .where("quizQuestion.quizId = :quizId", {
        quizId: quiz.id,
      })
      .orderBy("quizQuestion.questionOrder", "ASC")
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany();

    const ids = rows.map((row) => row.id);

    if (ids.length === 0) {
      return {
        quiz,
        quizQuestions: [],
        total,
      };
    }

    const quizQuestions = await this.quizQuestionRepository.find({
      where: {
        id: In(ids),
      },
      relations: {
        question: {
          versions: {
            options: true,
          },
        },
      },
    });

    quizQuestions.sort((a, b) => a.questionOrder - b.questionOrder);

    quizQuestions.forEach((quizQuestion) => {
      quizQuestion.question.versions = quizQuestion.question.versions.filter(
        (version) => version.isLatest,
      );
    });

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
