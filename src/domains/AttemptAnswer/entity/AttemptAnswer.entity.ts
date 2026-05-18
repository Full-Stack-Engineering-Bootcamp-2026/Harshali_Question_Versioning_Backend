import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { Generated } from "typeorm";
import { QuizAttempt } from "../../QuizAttempt/entity/QuizAttempt.entity";
import { QuestionVersion } from "../../QuestionVersion/entity/QuestionVersion.entity";
import { CreateDateColumn } from "typeorm";
import { AttemptAnswerOption } from "../../AttemptAnswerOption/entity/AttemptAnswerOption.entity";
import { OneToMany } from "typeorm";
@Entity("attempt_answers")
export class AttemptAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  publicId!: string;

  @ManyToOne(() => QuizAttempt, (attempt) => attempt.answers)
  @JoinColumn({ name: "attemptId" })
  attempt!: QuizAttempt;

  @Column()
  attemptId!: number;

  @ManyToOne(() => QuestionVersion, (version) => version.attemptAnswers)
  @JoinColumn({ name: "questionVersionId" })
  questionVersion!: QuestionVersion;

  @Column()
  questionVersionId!: number;

  @Column({ type: "text", nullable: true })
  textAnswer?: string | null;

  @OneToMany(() => AttemptAnswerOption, (option) => option.attemptAnswer)
  selectedOptions!: AttemptAnswerOption[];

  @CreateDateColumn()
  createdAt!: Date;
}
