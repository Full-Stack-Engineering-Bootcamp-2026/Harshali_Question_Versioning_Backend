import { Service } from "typedi";

import { QuestionRepository } from "../repository/question.repository";

import {
  CreateQuestionRequestDto,
  QuestionResponseDto,
} from "../dto/question.dto";

import { Question } from "../entity/Question.entity";

@Service()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  public async createQuestion(
    userId: number,
    data: CreateQuestionRequestDto,
  ): Promise<QuestionResponseDto> {
    const question = await this.questionRepository.createQuestion({
      createdById: userId,
      isActive: true,
    });

    const version = await this.questionRepository.createVersion({
      questionId: question.id,
      versionNumber: 1,
      questionText: data.questionText,
      answerType: data.answerType,
      isLatest: true,
    });
    //loop through each option and option text and option order
    if (data.answerType !== "TEXT" && data.options && data.options.length > 0) {
      await this.questionRepository.createOptions(
        data.options.map((option, index) => ({
          questionVersionId: version.id,
          optionText: option,
          optionOrder: index + 1,
        })),
      );
    }

    return {
      publicId: question.publicId,
      questionText: version.questionText,
      answerType: version.answerType,
      versionNumber: version.versionNumber,
    };
  }
}
