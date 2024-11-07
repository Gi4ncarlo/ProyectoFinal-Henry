import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
    ) { }
    getAllAdmin() {
        try {
            return this.adminRepository.find();

        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
    getAdminById(id: string) {
        try {
            const admin = this.adminRepository.findOne({ where: { id } });
            return admin;
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
}
