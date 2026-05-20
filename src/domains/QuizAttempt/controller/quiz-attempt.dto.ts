import { Request, Response } from "express";
import { Service } from "typedi";

import { AttemptService } from "../service/quiz-attempt.service";

import { SubmitQuizAttemptRequestDto } from "../dto/quiz-attempt.dto";

import { generateResponse } from "../../../common/utils/response.util";
import { HttpStatus } from "../../../common/constants/http-status.constants";

@Service()
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  public async submitQuizAttempt(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const data = await this.attemptService.submitQuizAttempt(
      req.user!.id,
      req.params.publicId as string,
      req.body as SubmitQuizAttemptRequestDto,
    );

    return generateResponse(res, {
      statusCode: HttpStatus.CREATED,
      message: "Quiz attempted successfully",
      data,
    });
  }
}
