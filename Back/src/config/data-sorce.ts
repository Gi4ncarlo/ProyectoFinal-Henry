import { TypeOrmModule } from '@nestjs/typeorm';
import {config } from 'dotenv';

config( {
    path: '.env.development'
});

export const dataSource = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'], 
    synchronize: true,
    // logging: true,
<<<<<<< HEAD
    dropSchema: true,
=======
    // dropSchema: true,
>>>>>>> b9082f8bb95f74e59d95cc495b89705e40f4f5f4
    ssl: {
        rejectUnauthorized: false, 
    },
})
