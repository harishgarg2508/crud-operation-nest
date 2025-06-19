import { LoggerDecorator } from "src/decorators/logger.decorator";

@LoggerDecorator()
export class LoggerService {
  private logger: Console;
}