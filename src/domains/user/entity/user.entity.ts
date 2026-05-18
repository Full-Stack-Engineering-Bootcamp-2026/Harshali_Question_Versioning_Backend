import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ROLES, RoleType } from "../../../common/constants/roles.constants";
import { Question } from "../../Question/entity/Question.entity";
import { Quiz } from "../../Quiz/entity/Quiz.entity";
import { QuizAttempt } from "../../QuizAttempt/entity/QuizAttempt.entity";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "uuid",
    unique: true,
  })
  @Generated("uuid")
  publicId!: string;

  @Column({ type: "varchar", length: 100 })
  firstName!: string;

  @Column({ type: "varchar", length: 100 })
  lastName!: string;

  @Column({ type: "varchar", unique: true, length: 150 })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "enum", enum: Object.values(ROLES), default: ROLES.USER })
  role!: RoleType;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Question, (question) => question.createdBy)
  questions!: Question[];

  @OneToMany(() => Quiz, (quiz) => quiz.createdBy)
  quizzes!: Quiz[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.user)
  attempts!: QuizAttempt[];
}
