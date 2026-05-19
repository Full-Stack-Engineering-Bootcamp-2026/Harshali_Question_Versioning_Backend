import { Request, Response } from "express";
import { Service } from "typedi";

import { QuizService } from "../service/quiz.service";

import { CreateQuizRequestDto } from "../dto/quiz.dto";

import { generateResponse } from "../../../common/utils/response.util";

import { HttpStatus } from "../../../common/constants/http-status.constants";

@Service()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  public async createQuiz(req: Request, res: Response): Promise<Response> {
    const data = await this.quizService.createQuiz(
      req.user!.id,
      req.body as CreateQuizRequestDto,
    );

    return generateResponse(res, {
      statusCode: HttpStatus.CREATED,
      message: "Quiz created successfully",
      data,
    });
  }
}
