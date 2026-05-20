export interface CreateQuizRequestDto {
  title: string;
  questionPublicIds: string[];
}

export interface QuizResponseDto {
  publicId: string;
  title: string;
  totalQuestions: number;
}

export interface QuizQuestionResponseDto {
  questionPublicId: string;
  questionText: string;
  answerType: string;
  versionNumber: number;
  options: string[];
}

export interface QuizDetailResponseDto {
  publicId: string;
  title: string;
  questions: QuizQuestionResponseDto[];
}
