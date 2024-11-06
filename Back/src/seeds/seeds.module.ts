import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceProvided } from "src/modules/serviceProvided/entities/serviceProvided.entity";
import { User } from "src/modules/user/entities/user.entity";
import { UsersSeed } from "./user/users.seed";
import { ServiceSeed } from "./serviceSeed/service.seed";


@Module({
    imports: [TypeOrmModule.forFeature([User, ServiceProvided])],
    providers: [UsersSeed, ServiceSeed],
    exports: [UsersSeed, ServiceSeed]
})
export class SeedsModule {}