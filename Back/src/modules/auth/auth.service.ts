import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { SignInAuthDto } from '../user/dto/signin-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from '../user/dto/signup-user.dto';
import * as bcrypt from 'bcrypt'
import { AdminService } from '../admin/admin.service';
import { GardenerService } from '../gardener/gardener.service';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private adminService: AdminService,
        private gardenerService: GardenerService,
        private jwtService: JwtService
    ) { }

    async signIn(credentials: SignInAuthDto) {
        try {
            console.log("Credenciales recibidas en signIn:", credentials);
        const user = await this.userService.findByEmail(credentials.email);
        const admin = await this.adminService.findByEmail(credentials.email);
        const gardener = await this.gardenerService.findByEmail(credentials.email);

        if (user) {
            const isPasswordMatching = await bcrypt.compare(
                credentials.password,
                user.password
            )
            if (!isPasswordMatching) {
                throw new HttpException('credenciales incorrectas', HttpStatus.UNAUTHORIZED)
            }
            const token = await this.createToken(user)
            return { token, user};
        }
        if (admin) {
            const isPasswordMatching = await bcrypt.compare(
                credentials.password,
                admin.password
            )
            if (!isPasswordMatching) {
                throw new HttpException('credenciales incorrectas', HttpStatus.UNAUTHORIZED)
            }
            const token = await this.createToken(admin)
            return { token , user:admin};
        }
        if (gardener) {
            const isPasswordMatching = await bcrypt.compare(
                credentials.password,
                gardener.password
            )
            if (!isPasswordMatching) {
                throw new HttpException('credenciales incorrectas', HttpStatus.UNAUTHORIZED)
            }
            const token = await this.createToken(gardener)
            return { token, user:gardener};   
        }

        throw new HttpException('USER NOT FOUND IN THE DB', HttpStatus.UNAUTHORIZED)
        } catch (error) {
            throw new HttpException(error, 401);
        }
    }

    async signUp(signUpUser: SignUpAuthDto) {
            const userFinded = await this.userService.findByEmail(
                signUpUser.email
            );

            if (userFinded) {
                throw new BadRequestException('User already exists')
            }

            if (signUpUser.password !== signUpUser.passwordConfirm) {
                throw new HttpException('Password does not match', 400)
            }

            signUpUser.password = await bcrypt.hash(signUpUser.password, 10)

            if (!signUpUser.password) {
                throw new BadRequestException('Error at password hash')
            }

            const newUser = await this.userService.create(signUpUser)
            return newUser;
        }

    private async createToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.role,
        };

        return this.jwtService.signAsync(payload);
    }
}