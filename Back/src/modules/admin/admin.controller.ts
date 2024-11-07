import { Controller, Get, HttpException, Param, ParseUUIDPipe } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    getAllAdmin() {
        try {
            return this.adminService.getAllAdmin();
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
    @Get(':id')
    getAdminById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return this.adminService.getAdminById(id);
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
}
