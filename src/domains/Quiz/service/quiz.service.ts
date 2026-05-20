import { Service } from "typedi";

import { QuizRepository } from "../repository/quiz.repository";
import { QuestionRepository } from "../../Question/repository/question.repository";

import { CreateQuizRequestDto, QuizResponseDto } from "../dto/quiz.dto";

import { NotFoundException } from "../../../common/exceptions";
import { QuizDetailResponseDto } from "../dto/quiz.dto";
@Service()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}
  //map quiz and question with latest version=>QuizQuestion
  public async createQuiz(
    userId: number,
    data: CreateQuizRequestDto,
  ): Promise<QuizResponseDto> {
    const quiz = await this.quizRepository.createQuiz({
      title: data.title,
      createdById: userId,
      isActive: true,
    });
    //create empty arr of quiz que
    const quizQuestionArr = [];

    for (let i = 0; i < data.questionPublicIds.length; i++) {
      const questionPublicId = data.questionPublicIds[i];

      const question =
        await this.questionRepository.findQuestionByPublicId(questionPublicId);

      if (!question) {
        throw new NotFoundException("Question not found");
      }

      const latestQuestionVersion =
        await this.questionRepository.findLatestVersion(question.id);

      if (!latestQuestionVersion) {
        throw new NotFoundException("Latest question version not found");
      }
      //add to arr
      quizQuestionArr.push({
        quizId: quiz.id,
        questionId: question.id,
        questionVersionId: latestQuestionVersion.id,
        questionOrder: i + 1,
      });
    }

    await this.quizRepository.createQuizQuestions(quizQuestionArr);

    return {
      publicId: quiz.publicId,
      title: quiz.title,
      totalQuestions: quizQuestionArr.length,
    };
  }

  public async getAllQuizzes(): Promise<QuizResponseDto[]> {
    const quizzes = await this.quizRepository.findAllQuizzes();

    return quizzes.map((quiz) => ({
      publicId: quiz.publicId,
      title: quiz.title,
      totalQuestions: quiz.quizQuestions ? quiz.quizQuestions.length : 0,
    }));
  }
  // GET QUIZ BY PUBLIC ID
  public async getQuizByPublicId(
    publicId: string,
  ): Promise<QuizDetailResponseDto> {
    const quiz = await this.quizRepository.findQuizDetailsByPublicId(publicId);

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    return {
      publicId: quiz.publicId,
      title: quiz.title,

      questions: quiz.quizQuestions.map((quizQuestion) => ({
        questionPublicId: quizQuestion.question.publicId,

        questionText: quizQuestion.questionVersion.questionText,

        answerType: quizQuestion.questionVersion.answerType,

        versionNumber: quizQuestion.questionVersion.versionNumber,

        options: quizQuestion.questionVersion.options.map(
          (option) => option.optionText,
        ),
      })),
    };
  }
}
