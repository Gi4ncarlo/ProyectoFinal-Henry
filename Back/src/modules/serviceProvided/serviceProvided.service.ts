import { HttpException, Injectable } from "@nestjs/common";
import { ServiceProvided } from "./entities/serviceProvided.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ServiceProvidedService {


    constructor(
        @InjectRepository(ServiceProvided)
        private readonly serviceProvidedRepository: Repository<ServiceProvided>,
    ) { }
    async getAllServiceProvidedService() {
        try {
            const allData = await this.serviceProvidedRepository.find();
            return allData;
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
    async getServiceProvidedByIdService(id: string) {
        try {
            const data = await this.serviceProvidedRepository.findOne({ where: { id } });
            return data;
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }

    async createServiceProvidedService(createServiceProvidedDto: Omit<ServiceProvided, 'id'>) {
        try {
            const newServiceProvided = await this.serviceProvidedRepository.create(createServiceProvidedDto);
            return await this.serviceProvidedRepository.save(newServiceProvided);
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
    // async updateServiceProvided(id: string, updateServiceProvidedDto: UpdateServiceProvidedDto) {
    //     const data = await this.getServiceProvidedByIdRepository(id);
    //     if (!data) {
    //         throw new HttpException('Servicio no encontrado', 400);
    //     }
    //     return await this.serviceProvidedRepository.save({ ...data, ...updateServiceProvidedDto });

    // }
}