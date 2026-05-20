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

export interface AttemptAnswerDetailDto {
  questionText: string;
  answerType: string;
  versionNumber: number;
  textAnswer?: string | null;
  selectedOptions: string[];
}

export interface AttemptDetailResponseDto {
  publicId: string;
  quizTitle: string;
  attemptNumber: number;
  submittedAt: Date;
  answers: AttemptAnswerDetailDto[];
}
