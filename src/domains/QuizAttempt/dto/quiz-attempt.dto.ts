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
