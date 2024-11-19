import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

 
  @Post('welcome')
  @HttpCode(HttpStatus.OK)
  async sendWelcomeEmail(@Body() payload: SendMailDto) {
    const { to, username } = payload;

    await this.mailService.sendWelcomeEmail(to, username);

    return {
      message: `Welcome email sent successfully to ${to}`,
    };
  }
}
