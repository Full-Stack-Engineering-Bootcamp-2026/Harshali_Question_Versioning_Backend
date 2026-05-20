import { Router } from "express";
import { Service } from "typedi";

import { QuizController } from "../controller/quiz.controller";

import { authenticate } from "../../../common/middleware/authenticate.middleware";

import { requireRole } from "../../../common/middleware/authorize.middleware";

import { asyncHandler } from "../../../common/utils/async-handler";

import { ROLES } from "../../../common/constants/roles.constants";

@Service()
export class QuizRoutes {
  private readonly router: Router;

  constructor(private readonly controller: QuizController) {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authenticate,
      requireRole(ROLES.ADMIN),
      asyncHandler(this.controller.createQuiz.bind(this.controller)),
    );

    this.router.get(
      "/",
      authenticate,
      asyncHandler(this.controller.getAllQuizzes.bind(this.controller)),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
