import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../db/data-source";
import { Service } from "typedi";
@Service()
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const item = this.repository.create(data);

    const user = await this.repository.save(item);

    return user;
  }
}
