export interface CreateQuizRequestDto {
  title: string;
  questionPublicIds: string[];
}

export interface QuizResponseDto {
  publicId: string;
  title: string;
  totalQuestions: number;
}
