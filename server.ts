import { createRequestHandler } from '@remix-run/architect';
// Only used for type checking
// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import * as build from './build/server/index';

const requestHandler = createRequestHandler({
  build,
});

export const handler = (...args: Parameters<APIGatewayProxyHandlerV2>) => {
  const [apiGatewayEvent, ...rest] = args;
  apiGatewayEvent.rawPath = apiGatewayEvent.rawPath.replace(/^\/dev/, '');
  apiGatewayEvent.requestContext.http.path = apiGatewayEvent.requestContext.http.path.replace(/^\/dev/, '');

  return requestHandler(apiGatewayEvent, ...rest);
};
