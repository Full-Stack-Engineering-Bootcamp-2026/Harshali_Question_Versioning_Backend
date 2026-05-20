export interface SubmitAnswerDto {
  questionVersionPublicId: string;
  textAnswer?: string | null;
  selectedOptionPublicIds?: string[];
}
export interface SubmitQuizAttemptRequestDto {
  answers: SubmitAnswerDto[];
}
export interface QuizAttemptResponseDto {
  publicId: string;
  quizPublicId: string;
  attemptNumber: number;
  totalAnswers: number;
}

export interface UserAttemptResponseDto {
  publicId: string;
  quizTitle: string;
  quizPublicId: string;
  attemptNumber: number;
  submittedAt: Date;
}
