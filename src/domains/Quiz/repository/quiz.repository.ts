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
}
