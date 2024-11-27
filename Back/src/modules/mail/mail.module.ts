import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail.controller';

@Module({
  imports: [ConfigModule],
  providers: [MailService, MailController],
  controllers: [MailController],
  exports: [MailService, MailController],
})
export class MailModule {}
