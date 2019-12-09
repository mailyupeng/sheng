import uuid from 'uuid/v4';
import {defaultLoggerBuilder} from '@sensejs/logger';
import {HttpInterceptor, HttpContext} from '@sensejs/http';
import {Component, InjectLogger, Logger, LoggerFactory} from '@sensejs/core';

@Component()
export class TracingInterceptor extends HttpInterceptor {
  constructor(@InjectLogger(TracingInterceptor) private logger: Logger) {
    super();
  }

  async intercept(context: HttpContext, next: () => Promise<void>): Promise<void> {
    context.bindContextValue(LoggerFactory, new LoggerFactory(defaultLoggerBuilder.setTraceId(uuid())));
    return next();
  }
}
