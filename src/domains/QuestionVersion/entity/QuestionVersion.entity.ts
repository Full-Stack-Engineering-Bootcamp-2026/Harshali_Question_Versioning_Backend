import { Service } from "typedi";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "../../Question/entity/Question.entity";
import {
  QUESTION_TYPES,
  QuestionType,
} from "../../../common/constants/question-type.constant";
import { QuestionOption } from "../../QuestionOption/entity/QuestionOption.entity";
import { AttemptAnswer } from "../../AttemptAnswer/entity/AttemptAnswer.entity";
@Entity("question_versions")
export class QuestionVersion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  publicId!: string;

  @ManyToOne(() => Question, (question) => question.versions)
  @JoinColumn({ name: "questionId" })
  question!: Question;

  @Column()
  questionId!: number;

  @Column()
  versionNumber!: number;

  @Column({ type: "boolean", default: true })
  isLatest!: boolean;

  @Column({ type: "text" })
  questionText!: string;

  @Column({ type: "enum", enum: Object.values(QUESTION_TYPES) })
  answerType!: QuestionType;

  @OneToMany(() => QuestionOption, (options) => options.questionVersion)
  options!: QuestionOption[];

  @OneToMany(
    () => AttemptAnswer,
    (attemptAnswer) => attemptAnswer.questionVersion,
  )
  attemptAnswers!: AttemptAnswer[];

  @CreateDateColumn()
  createdAt!: Date;
}
