import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const logger = new Logger('HTTP');
    const start = Date.now();

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest() as Request;

    return next.handle().pipe(
      tap(() => {
        const requestTime = new Date();
        const requestMessage = `${requestTime.toLocaleDateString()} ${requestTime.toLocaleTimeString()}`;

        return logger.log(
          `[${requestMessage}] | ${request.method} | ${request.path} - ${
            Date.now() - start
          } ms - ${(httpContext.getRequest() as Request).statusCode}`,
        );
      }),
    );
  }
}
