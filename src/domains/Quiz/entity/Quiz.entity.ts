import { Service } from "typedi";
import {
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Column } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { ManyToOne } from "typeorm";
import { QuizQuestion } from "../../QuizQuestion/entity/QuizQuestion.entity";
import { QuizAttempt } from "../../QuizAttempt/entity/QuizAttempt.entity";
import { boolean } from "joi";
@Entity("quiz")
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  publicId!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn({ name: "createdById" })
  createdBy!: string;

  @Column()
  createdById!: number;

  @Column({ type: "boolean", default: "true" })
  isActive!: boolean;

  @OneToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.quiz)
  quizQuestions!: QuizQuestion[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
  quizAttempts!: QuizAttempt[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
