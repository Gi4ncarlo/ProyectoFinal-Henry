import { HttpException, Injectable, ParseUUIDPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceProvided } from "./entities/serviceProvided.entity";
import { Repository } from "typeorm";
import { UpdateServiceProvidedDto } from "./Dtos/serviceProvided.dto";

@Injectable()
export class serviceProvidedRepository {


    constructor(
        @InjectRepository(ServiceProvided)
        private readonly serviceProvidedRepository: Repository<ServiceProvided>,
    ) { }
    async getAllServiceProvidedRepository() {
        try {
            return await this.serviceProvidedRepository.find();
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
    async getServiceProvidedByIdRepository(id: string) {
        try {
            const data = await this.serviceProvidedRepository.findOne({ where: { id } });
            return data;
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }

    async createServiceProvidedRepository(createServiceProvidedDto: Omit<ServiceProvided, 'id'>) {
        try {
            const newServiceProvided = await this.serviceProvidedRepository.create(createServiceProvidedDto);
            return await this.serviceProvidedRepository.save(newServiceProvided);
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
    async updateServiceProvidedRepository(id: string, updateServiceProvidedDto: UpdateServiceProvidedDto) {
        const data = await this.getServiceProvidedByIdRepository(id);
        if (!data) {
            throw new HttpException('Servicio no encontrado', 400);
        }
        return await this.serviceProvidedRepository.save({ ...data, ...updateServiceProvidedDto });

    }
}