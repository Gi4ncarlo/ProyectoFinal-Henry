import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Gardener } from "src/modules/gardener/entities/gardener.entity";
import { gardenersMock } from "./gardener.mock";
import { ServiceProvided } from "src/modules/serviceProvided/entities/serviceProvided.entity";
import { serviceMock } from "../serviceSeed/service-mock";

@Injectable()
export class GardenerSeed {
    constructor(
        @InjectRepository(Gardener)
        private readonly gardenerRepository: Repository<Gardener>,

        @InjectRepository(ServiceProvided)
        private readonly serviceProvidedRepository: Repository<ServiceProvided>,
    ) {}

    async seed() {
        const existingGardenerEmail = (await this.gardenerRepository.find()).map(
            (gardener) => gardener.email,
        );

        const services = await this.serviceProvidedRepository.find();
          
        // Asignar todos los servicios a cada jardinero nuevo
        for (const gardenerData of gardenersMock) {
            if (!existingGardenerEmail.includes(gardenerData.email)) {
                const gardener = this.gardenerRepository.create({
                    ...gardenerData,
                    serviceProvided: services,
                });

                // Guardar el jardinero con los servicios asociados
                await this.gardenerRepository.save(gardener);
            }
        }
    }
}
