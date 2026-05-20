import { Service } from "typedi";
import { AttemptRepository } from "../repository/quiz-attempt.repository";
import { QuizRepository } from "../../Quiz/repository/quiz.repository";
import { UserAttemptResponseDto } from "../dto/quiz-attempt.dto";
import {
  SubmitQuizAttemptRequestDto,
  QuizAttemptResponseDto,
} from "../dto/quiz-attempt.dto";

import { NotFoundException } from "../../../common/exceptions";

@Service()
export class AttemptService {
  constructor(
    private readonly attemptRepository: AttemptRepository,
    private readonly quizRepository: QuizRepository,
  ) {}

  public async submitQuizAttempt(
    userId: number,
    quizPublicId: string,
    data: SubmitQuizAttemptRequestDto,
  ): Promise<QuizAttemptResponseDto> {
    //find which quiz user is attemptiing
    const quiz = await this.quizRepository.findQuizByPublicId(quizPublicId);

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }
    //cnt prev attempts
    const previousAttempts = await this.attemptRepository.countUserQuizAttempts(
      userId,
      quiz.id,
    );
    //create new attempt
    const attempt = await this.attemptRepository.createAttempt({
      userId,
      quizId: quiz.id,
      attemptNumber: previousAttempts + 1,
    });

    for (const submittedAnswer of data.answers) {
      const questionVersion =
        await this.attemptRepository.findQuestionVersionByPublicId(
          submittedAnswer.questionVersionPublicId,
        );

      if (!questionVersion) {
        throw new NotFoundException("Question version not found");
      }

      const answer = await this.attemptRepository.createAnswer({
        attemptId: attempt.id,
        questionVersionId: questionVersion.id,
        textAnswer: submittedAnswer.textAnswer,
      });
      //for radio and checkbox ans
      if (
        submittedAnswer.selectedOptionPublicIds &&
        submittedAnswer.selectedOptionPublicIds.length > 0
      ) {
        const answerOptions = [];

        for (
          let i = 0;
          i < submittedAnswer.selectedOptionPublicIds.length;
          i++
        ) {
          const optionPublicId = submittedAnswer.selectedOptionPublicIds[i];

          const option =
            await this.attemptRepository.findOptionByPublicId(optionPublicId);

          if (!option) {
            throw new NotFoundException("Question option not found");
          }

          answerOptions.push({
            attemptAnswerId: answer.id,
            questionOptionId: option.id,
          });
        }

        await this.attemptRepository.createAnswerOptions(answerOptions);
      }
    }

    return {
      publicId: attempt.publicId,
      quizPublicId: quiz.publicId,
      attemptNumber: attempt.attemptNumber,
      totalAnswers: data.answers.length,
    };
  }

  public async getMyAttempts(
    userId: number,
  ): Promise<UserAttemptResponseDto[]> {
    const attempts = await this.attemptRepository.findMyAttempts(userId);

    return attempts.map((attempt) => ({
      publicId: attempt.publicId,
      quizPublicId: attempt.quiz.publicId,
      quizTitle: attempt.quiz.title,
      attemptNumber: attempt.attemptNumber,
      submittedAt: attempt.submittedAt,
    }));
  }
}
