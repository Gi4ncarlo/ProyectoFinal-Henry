import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Res } from "@nestjs/common";
import { ServiceProvidedService } from "./serviceProvided.service";
import { Response } from "express";
import { UpdateServiceProvidedDto } from "./Dtos/serviceProvided.dto";
import { ServiceProvided } from "./entities/serviceProvided.entity";

@Controller('serviceProvided')
export class ServiceProvidedController {
    constructor(
        private readonly serviceProvidedService: ServiceProvidedService
    ) { }
    @Get()
    async getAllServiceProvided(@Res() res: Response,) {
        try {
            const data = await this.serviceProvidedService.getAllServiceProvidedService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    @Get('/:id')
    async getServiceProvidedById(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
        try {
            const data = await this.serviceProvidedService.getServiceProvidedByIdService(id);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    @Post()
    async createServiceProvided(@Res() res: Response, @Body() createServiceProvidedDto: Omit<ServiceProvided, 'id'>) {
        try {
            const data = await this.serviceProvidedService.createServiceProvidedService(createServiceProvidedDto);
            return res.status(200).json({
                service: data,
                message: 'Servicio creado con exito'
            });
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    // @Patch('/:id')
    // async updateServiceProvided(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string, @Body() updateServiceProvidedDto: UpdateServiceProvidedDto) {
    //     try {
    //         const data = await this.serviceProvidedService.updateServiceProvidedService(id, updateServiceProvidedDto);
    //         return res.status(200).json({
    //             service: data,
    //             message: 'Servicio actualizado con exito'
    //         });
    //     } catch (error) {
    //         return res.status(400).json(error);
    //     }
    // }
}