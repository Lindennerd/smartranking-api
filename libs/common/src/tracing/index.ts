import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import * as process from 'process';

export const tracing = async (serviceName: string, jaegarUrl: string) => {
  const otelSDK = new NodeSDK({
    serviceName: serviceName,
    spanProcessor: new BatchSpanProcessor(
      new JaegerExporter({
        endpoint: jaegarUrl,
      }),
    ),
    contextManager: new AsyncLocalStorageContextManager(),
    textMapPropagator: new CompositePropagator({
      propagators: [
        new JaegerPropagator(),
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
        new B3Propagator(),
        new B3Propagator({
          injectEncoding: B3InjectEncoding.MULTI_HEADER,
        }),
      ],
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  process.on('SIGTERM', () => {
    otelSDK.shutdown().then(() => {
      console.log('SDK shutdown');
    });
  });

  return otelSDK;
};
