import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";

@Module({
    imports: [],
    controllers: [],
    providers: [LoggerService],
    exports: []
})
export class LoggerModule {
   
}