import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);

  constructor(private readonly configService: ConfigService) {}

  public async uploadFile(file: any, _id: string): Promise<{ url: string }> {
    const s3 = new S3({
      region: this.configService.get<string>('S3_REGION'),
      accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY'),
    });

    const extension = file.originalname.split('.')[1];
    const urlKey = `${_id}.${extension}`;

    const data = s3
      .putObject({
        Body: file.buffer,
        Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
        Key: urlKey,
      })
      .promise()
      .then(
        (response) => {
          return {
            url: `https://${this.configService.get<string>(
              'S3_BUCKET_NAME',
            )}.s3.${this.configService.get<string>(
              'S3_REGION',
            )}.amazonaws.com/${urlKey}`,
          };
        },
        (err) => {
          this.logger.error(err);
          return err;
        },
      );

    return data;
  }
}
