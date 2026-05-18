import { Service } from "typedi";
import {
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Column } from "typeorm";
import { QuestionVersion } from "../../QuestionVersion/entity/QuestionVersion.entity";

@Entity("question_options")
export class QuestionOption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  publicId!: string;

  @ManyToOne(() => QuestionVersion, (version) => version.options)
  @JoinColumn({ name: "questionVersionId" })
  questionVersion!: QuestionVersion;

  @Column()
  questionVersionId!: number;

  @Column({ type: "varchar", length: 255 })
  optionText!: string;

  @Column()
  optionOrder!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
