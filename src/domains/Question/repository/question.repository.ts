import { Repository } from "typeorm";
import { AppDataSource } from "../../../db/data-source";
import { Service } from "typedi";
import { Question } from "../entity/Question.entity";
import { QuestionVersion } from "../../QuestionVersion/entity/QuestionVersion.entity";
import { QuestionOption } from "../../QuestionOption/entity/QuestionOption.entity";
@Service()
export class QuestionRepository {
  private readonly questionRepository: Repository<Question>;
  private readonly versionRepository: Repository<QuestionVersion>;
  private readonly optionRepository: Repository<QuestionOption>;
  constructor() {
    this.questionRepository = AppDataSource.getRepository(Question);
    this.versionRepository = AppDataSource.getRepository(QuestionVersion);
    this.optionRepository = AppDataSource.getRepository(QuestionOption);
  }

  public async createQuestion(data: Partial<Question>): Promise<Question> {
    const question = this.questionRepository.create(data);

    return await this.questionRepository.save(question);
  }

  public async createVersion(
    data: Partial<QuestionVersion>,
  ): Promise<QuestionVersion> {
    const version = this.versionRepository.create(data);

    return await this.versionRepository.save(version);
  }

  public async createOptions(
    data: Partial<QuestionOption>[],
  ): Promise<QuestionOption[]> {
    const options = this.optionRepository.create(data);

    return await this.optionRepository.save(options);
  }
  //find que with uuid sent
  public async findQuestionByPublicId(
    publicId: string,
  ): Promise<Question | null> {
    return await this.questionRepository.findOne({
      where: { publicId },
    });
  }
  //find latest version of que means isLatest:true
  public async findLatestVersion(
    questionId: number,
  ): Promise<QuestionVersion | null> {
    return await this.versionRepository.findOne({
      where: {
        questionId,
        isLatest: true,
      },
    });
  }

  public async updateOldVersion(
    id: number,
    data: Partial<QuestionVersion>,
  ): Promise<void> {
    await this.versionRepository.update(id, data);
  }
  //que with version with option(arr of que obj)
  public async findAllQuestions(): Promise<Question[]> {
    return await this.questionRepository
      .createQueryBuilder("question")

      .leftJoinAndSelect(
        "question.versions",
        "version",
        "version.isLatest = true",
      )

      .leftJoinAndSelect("version.options", "option")

      .where("question.isActive = :isActive", {
        isActive: true,
      })

      .orderBy("question.createdAt", "DESC")
      .getMany();
  }

  public async findQuestionDetailsByPublicId(
    publicId: string,
  ): Promise<Question | null> {
    return await this.questionRepository
      .createQueryBuilder("question")
      .leftJoinAndSelect(
        "question.versions",
        "version",
        "version.isLatest = true",
      )
      .leftJoinAndSelect("version.options", "option")
      .where("question.publicId = :publicId", { publicId })
      .andWhere("question.isActive = :isActive", { isActive: true })
      .getOne();
  }
}
