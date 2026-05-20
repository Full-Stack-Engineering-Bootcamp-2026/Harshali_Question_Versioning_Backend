import { Router } from "express";
import { Service } from "typedi";

import { AttemptController } from "../controller/quiz-attempt.dto";

import { authenticate } from "../../../common/middleware/authenticate.middleware";

import { requireRole } from "../../../common/middleware/authorize.middleware";

import { asyncHandler } from "../../../common/utils/async-handler";

import { ROLES } from "../../../common/constants/roles.constants";

@Service()
export class AttemptRoutes {
  private readonly router: Router;

  constructor(private readonly controller: AttemptController) {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/quizzes/:publicId/attempt",
      authenticate,
      requireRole(ROLES.USER),
      asyncHandler(this.controller.submitQuizAttempt.bind(this.controller)),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
