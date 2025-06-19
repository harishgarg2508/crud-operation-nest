import { Logger } from '@nestjs/common';

export function LoggerDecorator() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const className = constructor.name;
    const logger = new Logger(className);

    return class extends constructor {
      constructor(...args: any[]) {
        const startTime = new Date().toISOString();
        logger.log(`[${startTime}] Initializing class: ${className}`);
        super(...args);
        const endTime = new Date().toISOString();
        logger.log(`[${endTime}] Finished initializing class: ${className}`);
      }
    };
  };
}