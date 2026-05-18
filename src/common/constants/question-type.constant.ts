export const QUESTION_TYPES = {
  RADIO: "RADIO",
  CHECKBOX: "CHECKBOX",
  TEXT: "TEXT",
} as const;
export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];
