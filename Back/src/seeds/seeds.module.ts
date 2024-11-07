import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceProvided } from "src/modules/serviceProvided/entities/serviceProvided.entity";
import { User } from "src/modules/user/entities/user.entity";
import { UsersSeed } from "./user/users.seed";
import { ServiceSeed } from "./serviceSeed/service.seed";
import { GardenerSeed } from "./gardener/gardener.seed";
import { Gardener } from "src/modules/gardener/entities/gardener.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User, ServiceProvided, Gardener])],
    providers: [UsersSeed, ServiceSeed, GardenerSeed],
    exports: [UsersSeed, ServiceSeed, GardenerSeed]
})
export class SeedsModule {}