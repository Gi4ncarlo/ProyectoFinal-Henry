import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UploadFileDto } from 'src/file-upload/dtos/uploadFile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
  
    const [results, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: skip,
      relations: ["servicesOrder"]
    });

    if(total === 0){
      throw new NotFoundException('Gardner not foundend');
    }
  
    return {
      count: total,
      data: results,
      page,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<Partial<User>> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { id };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async updateProfileImage(id: string, imageUrl: string): Promise<void> {
    await this.userRepository.update(id, { profileImageUrl: imageUrl });
  }
}
