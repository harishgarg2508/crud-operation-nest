import { Logger } from '@nestjs/common';

export function LoggerDecorator() {
  return function (value) {
    value.prototype.onModuleInit =  ()=> {
      Logger.log(`${value.name}  initialized : ${new Date().toLocaleTimeString()}`);
    };
    value.prototype.onApplicationBootstrap =  () =>{
      Logger.log(`${value.name}  bootstrap : ${new Date().toLocaleTimeString()}`);
    };
      value.prototype.onModuleDestroy =  () =>{
      Logger.log(`${value.name}  destroyed : ${new Date().toLocaleTimeString()}`);
    };
    value.prototype.beforeApplicationShutdown =  () =>{
      Logger.log(`${value.name}  before shutdown : ${new Date().toLocaleTimeString()}`);
    };
    value.prototype.onApplicationShutdown =  () =>{
      Logger.log(`${value.name}  shutdown : ${new Date().toLocaleTimeString()}`);
    };

    return value;
    
  };
}