export interface CreateQuizRequestDto {
  title: string;
  questionPublicIds: string[];
}

export interface QuizResponseDto {
  publicId: string;
  title: string;
  totalQuestions: number;
}

export interface QuizOptionResponseDto {
  publicId: string;
  optionText: string;
}

export interface QuizQuestionResponseDto {
  questionPublicId: string;
  questionVersionPublicId: string;
  questionText: string;
  answerType: string;
  versionNumber: number;
  options: QuizOptionResponseDto[];
}

export interface QuizDetailResponseDto {
  publicId: string;
  title: string;
  questions: QuizQuestionResponseDto[];
}
