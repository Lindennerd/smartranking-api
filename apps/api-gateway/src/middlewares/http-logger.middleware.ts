import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: (error?: any) => void) {
    const { ip, method, path: url, baseUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log({
        occurrence: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        requestedUrl: `${baseUrl} ${url}`,
        status: statusCode,
        contentLength: contentLength,
        userAgent: userAgent,
        origin: ip,
      });
    });

    next();
  }
}
