import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const res: any = exception.getResponse();

    // const url: string = request.url;
    // const error: string = res.error;
    // const timestamp: string = new Date().toLocaleString();

    response.status(status).json({
      statusCode: res.statusCode,
      success: false,
      message: res.message,
    });
  }
}
