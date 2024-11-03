import { Injectable } from "@nestjs/common";
import { serviceProvidedRepository } from "./serviceProvided.repository";
import { UpdateServiceProvidedDto } from "./Dtos/serviceProvided.dto";
import { CreateServiceDetailDto } from "../service-details/dto/create-service-detail.dto";
import { ServiceProvided } from "./entities/serviceProvided.entity";

@Injectable()
export class ServiceProvidedService {


    constructor(
        private readonly serviceProvidedRepository: serviceProvidedRepository
    ) { }
    async getAllServiceProvidedService() {
        return await this.serviceProvidedRepository.getAllServiceProvidedRepository();
    }
    async getServiceProvidedByIdService(id: string) {
        return await this.serviceProvidedRepository.getServiceProvidedByIdRepository(id);
    }
    async updateServiceProvidedService(id: string, updateServiceProvidedDto: UpdateServiceProvidedDto) {
        return await this.serviceProvidedRepository.updateServiceProvidedRepository(id, updateServiceProvidedDto);
    }
    async createServiceProvidedService(createServiceProvidedDto: Omit<ServiceProvided, 'id'>) {
        return await this.serviceProvidedRepository.createServiceProvidedRepository(createServiceProvidedDto);
    }

}