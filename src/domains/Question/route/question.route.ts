import { Router } from "express";
import { Service } from "typedi";

import { QuestionController } from "../controller/question.controller";

import { authenticate } from "../../../common/middleware/authenticate.middleware";
import { requireRole } from "../../../common/middleware/authorize.middleware";

import { asyncHandler } from "../../../common/utils/async-handler";
import { ROLES } from "../../../common/constants/roles.constants";
import { createQuestionSchema } from "../validator/question.validation";
import { validate } from "../../../common/middleware/validate.middleware";
@Service()
export class QuestionRoutes {
  private readonly router: Router;

  constructor(private readonly controller: QuestionController) {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authenticate,
      requireRole(ROLES.ADMIN),
      validate(createQuestionSchema),
      asyncHandler(this.controller.createQuestion.bind(this.controller)),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
