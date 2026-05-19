import { Service } from "typedi";

import { QuestionRepository } from "../repository/question.repository";

import {
  CreateQuestionRequestDto,
  QuestionResponseDto,
} from "../dto/question.dto";

import { Question } from "../entity/Question.entity";
import { UpdateQuestionRequestDto } from "../dto/question.dto";
import { NotFoundException } from "../../../common/exceptions";
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
    //for the first time the version number will be 1 and isLatest will be true
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
  //UPDATE QUE BY ADMIN
  public async updateQuestion(
    publicId: string,
    data: UpdateQuestionRequestDto,
  ) {
    const question =
      await this.questionRepository.findQuestionByPublicId(publicId);
    if (!question) {
      throw new NotFoundException("Question not found");
    }
    const latestVersion = await this.questionRepository.findLatestVersion(
      question.id,
    );
    if (!latestVersion) {
      throw new NotFoundException("Question version not found");
    }
    //update old version to false first
    await this.questionRepository.updateOldVersion(latestVersion.id, {
      isLatest: false,
    });

    // create new version
    const newVersion = await this.questionRepository.createVersion({
      questionId: question.id,
      versionNumber: latestVersion.versionNumber + 1,
      questionText: data.questionText,
      answerType: data.answerType,
      isLatest: true,
    });

    // create new options
    if (data.answerType !== "TEXT" && data.options && data.options.length > 0) {
      await this.questionRepository.createOptions(
        data.options.map((option, index) => ({
          questionVersionId: newVersion.id,
          optionText: option,
          optionOrder: index + 1,
        })),
      );
    }

    return {
      publicId: question.publicId,
      questionText: newVersion.questionText,
      answerType: newVersion.answerType,
      versionNumber: newVersion.versionNumber,
    };
  }

  public;
}
