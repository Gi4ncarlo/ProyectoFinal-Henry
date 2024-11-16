import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from '../user/dto/signup-user.dto';
import { SignInAuthDto } from '../user/dto/signin-user.dto';
import { UserResponseDto } from '../user/dto/response-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credentials: SignInAuthDto){
      return this.authService.signIn(credentials)
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpUser: SignUpAuthDto) {
    const user = await this.authService.signUp(signUpUser);  // El servicio ya maneja el envío del correo
    return new UserResponseDto(user);  // Retorna el usuario con la respuesta deseada
  }

}
