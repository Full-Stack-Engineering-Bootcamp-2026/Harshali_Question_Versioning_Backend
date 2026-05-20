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

  public async getMyAttempts(req: Request, res: Response): Promise<Response> {
    const data = await this.attemptService.getMyAttempts(req.user!.id);

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "My attempts fetched successfully",
      data,
    });
  }

  public async getAttemptByPublicId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const data = await this.attemptService.getAttemptByPublicId(
      req.params.publicId as string,
    );

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Attempt fetched successfully",
      data,
    });
  }
}
