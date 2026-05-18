import { Service } from "typedi";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Column } from "typeorm";
import { Generated } from "typeorm";
import { Quiz } from "../../Quiz/entity/Quiz.entity";
import { Question } from "../../Question/entity/Question.entity";
import { QuestionVersion } from "../../QuestionVersion/entity/QuestionVersion.entity";
@Entity("quiz_questions")
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  publicId!: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizQuestions)
  @JoinColumn({ name: "quizId" })
  quiz!: Quiz;

  @Column()
  quizId!: number;

  @ManyToOne(() => Question, (ques) => ques)
  @JoinColumn({ name: "questionId" })
  question!: Question;

  @Column()
  questionId!: number;

  @ManyToOne(
    () => QuestionVersion,
    (questionVersion) => questionVersion.versionNumber,
  )
  @JoinColumn({ name: "questionVersionId" })
  questionVersion!: QuestionVersion;

  @Column()
  questionVersionId!: number;

  @Column()
  questionOrder!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
