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

import { User } from "../../user/entity/user.entity";
import { Quiz } from "../../Quiz/entity/Quiz.entity";
import { AttemptAnswer } from "../../AttemptAnswer/entity/AttemptAnswer.entity";

@Entity("quiz_attempts")
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  publicId!: string;

  @ManyToOne(() => User, (user) => user.attempts)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizAttempts)
  @JoinColumn({ name: "quizId" })
  quiz!: Quiz;

  @Column()
  quizId!: number;

  @Column()
  attemptNumber!: number;

  @OneToMany(() => AttemptAnswer, (answer) => answer.attempt)
  answers!: AttemptAnswer[];

  @CreateDateColumn()
  submittedAt!: Date;
}
