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

  public async getAllQuizzes(req: Request, res: Response): Promise<Response> {
    const data = await this.quizService.getAllQuizzes();

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Quizzes fetched successfully",
      data,
    });
  }

  public async getQuizByPublicId(req: Request, res: Response) {
    const publicId = req.params.publicId as string;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const result = await this.quizService.getQuizByPublicId(
      publicId,
      page,
      limit,
    );

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Quiz fetched successfully",
      data: result.data,
      additionalFields: {
        pagination: result.pagination,
      },
    });
  }
}
