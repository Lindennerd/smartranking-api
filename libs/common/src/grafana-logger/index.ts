import { Injectable, Logger, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GrafanaLogger extends Logger {
  constructor(
    private readonly configService: ConfigService,
    @Optional() context?: string,
  ) {
    super();
  }

  warn(
    message: string,
    trace?: string,
    context?: string,
    labels?: Record<string, string>,
  ) {
    super.log(message, trace, context, labels);
    this.sendLokiRequest(labels, message);
  }

  error(
    message: string,
    trace?: string,
    context?: string,
    labels?: Record<string, string>,
  ) {
    super.log(message, trace, context, labels);
    this.sendLokiRequest(labels, message);
  }

  log(
    message: string,
    trace?: string,
    context?: string,
    labels?: Record<string, string>,
  ) {
    super.log(message, trace, context, labels);
    this.sendLokiRequest(labels, message);
  }

  debug(
    message: string,
    trace?: string,
    context?: string,
    labels?: Record<string, string>,
  ) {
    super.debug(message, trace, context, labels);
  }

  private sendLokiRequest = (
    labels: Record<string, string>,
    message: string,
  ): any => {
    const data = JSON.stringify({
      streams: [
        {
          stream: labels,
          values: [[(Date.now() * 1000000).toString(), message]],
        },
      ],
    });

    axios({
      method: 'POST',
      url: `${this.configService.get<string>('GRAFANA_URL')}/loki/api/v1/push`,
      headers: {
        'Content-Type': 'application/json',
      },

      data: data,
    })
      .then()
      .catch((error) => console.log('error', error?.response?.data));
  };
}
