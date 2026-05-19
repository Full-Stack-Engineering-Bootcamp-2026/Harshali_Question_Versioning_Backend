import {
  QUESTION_TYPES,
  QuestionType,
} from "../../../common/constants/question-type.constant";
export interface CreateQuestionRequestDto {
  questionText: string;
  answerType: QuestionType;
  options?: string[];
}
export interface QuestionResponseDto {
  publicId: string;
  questionText: string;
  answerType: string;
  versionNumber: number;
}

export interface UpdateQuestionRequestDto {
  questionText: string;
  answerType: QuestionType;
  options?: string[];
}
export interface GetAllQuestionsResponseDto {
  publicId: string;
  questionText: string;
  answerType: string;
  versionNumber: number;
  options: string[];
}
