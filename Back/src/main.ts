import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedsModule } from './seeds/seeds.module';
import { UsersSeed } from './seeds/user/users.seed';
import { ServiceSeed } from './seeds/serviceSeed/service.seed';
import { loggsGlobal } from './middlewares/loggs.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(loggsGlobal);

  const userSeed = app.select(SeedsModule).get(UsersSeed);
  await userSeed.seed();
  console.log("La inserción de Usuarios ha terminado.");

  const serviceSeed = app.select(SeedsModule).get(ServiceSeed);
  await serviceSeed.seed();
  console.log("La inserción de Servicios preestablecidos para Jardineros ha terminado.");

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
