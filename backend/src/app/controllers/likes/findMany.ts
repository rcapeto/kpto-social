import { Request, Response } from 'express';

import { BaseController } from '~/app/controllers';
import { LikesFindManyUsecase } from '~/app/use-cases/likes/findMany/findMany-usecase';
import { Status } from '~/constants/status';
import { logger } from '~/service/logger';
import { getControllerError } from '~/utils/getControllerError';
import { likesFindManySchema } from '~/validation/likes/findMany';

export class LikesFindManyController implements BaseController {
  constructor(private usecase: LikesFindManyUsecase) {}

  async handler(request: Request, response: Response) {
    try {
      const page = +(request.query?.page ?? 1);
      const perPage = +(request.query?.perPage ?? 10);
      const search = (request.query?.search as string) ?? '';
      const postId = request.params?.id ?? '';

      const query = { perPage, page, search, postId };
      const params = likesFindManySchema.parse(query);

      const { count, likes, ...rest } = await this.usecase.execute(params);

      const successMessage = `Get all likes[${count}] from Post[${postId}] with success`;
      logger('success', successMessage);

      response.setHeader('X-TOTAL-COUNT', count);

      return response.status(Status.OK).json({
        data: {
          likes,
          ...rest,
        },
      });
    } catch (err) {
      const { error, message, status } = getControllerError(err);

      logger('error', message);

      return response.status(status).json({
        data: error,
      });
    }
  }
}
