import { Request, Response } from "express";
import { Service } from "typedi";

import { generateResponse } from "../../../common/utils/response.util";

import { HttpStatus } from "../../../common/constants/http-status.constants";
import { CreateQuestionRequestDto } from "../dto/question.dto";
import { QuestionService } from "../service/question.service";
import { UpdateQuestionRequestDto } from "../dto/question.dto";
@Service()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  public async createQuestion(req: Request, res: Response): Promise<Response> {
    const data = await this.questionService.createQuestion(
      req.user!.id,
      req.body as CreateQuestionRequestDto,
    );

    return generateResponse(res, {
      statusCode: HttpStatus.CREATED,
      message: "Question created successfully",
      data,
    });
  }

  public async updateQuestion(req: Request, res: Response): Promise<Response> {
    const data = await this.questionService.updateQuestion(
      req.params.publicId as string,
      req.body as UpdateQuestionRequestDto,
    );

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Question updated successfully",
      data,
    });
  }

  public async getAllQuestions(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const result = await this.questionService.getAllQuestions(page, limit);

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Questions fetched successfully",
      data: result.data,
      additionalFields: {
        pagination: result.pagination,
      },
    });
  }

  public async getQuestionByPublicId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const data = await this.questionService.getQuestionByPublicId(
      req.params.publicId as string,
    );

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Question fetched successfully",
      data,
    });
  }
}
