import { Module } from "@nestjs/common";
import { ServiceProvidedController } from "./serviceProvided.controller";
import { serviceProvidedRepository } from "./serviceProvided.repository";
import { ServiceProvidedService } from "./serviceProvided.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceProvidedEntity } from "./entities/serviceProvided.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceProvidedEntity]),],
    controllers: [ServiceProvidedController],
    providers: [serviceProvidedRepository, ServiceProvidedService],
    exports: [],
})
export class ServiceProvidedModule { }