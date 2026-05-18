import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { AttemptAnswer } from "../../AttemptAnswer/entity/AttemptAnswer.entity";
import { QuestionOption } from "../../QuestionOption/entity/QuestionOption.entity";

@Entity("attempt_answer_options")
export class AttemptAnswerOption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  publicId!: string;

  @ManyToOne(
    () => AttemptAnswer,
    (attemptAnswer) => attemptAnswer.selectedOptions,
  )
  @JoinColumn({ name: "attemptAnswerId" })
  attemptAnswer!: AttemptAnswer;

  @Column()
  attemptAnswerId!: number;

  @ManyToOne(() => QuestionOption)
  @JoinColumn({ name: "questionOptionId" })
  questionOption!: QuestionOption;

  @Column()
  questionOptionId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
