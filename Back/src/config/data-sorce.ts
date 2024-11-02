import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDetail } from 'src/modules/service-details/entities/service-detail.entity';



export const dataSource = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'dpg-csiej8ogph6c738i6o90-a.oregon-postgres.render.com',
    port: 5432,
    username: 'backend_rer6_user',
    password: '7lQXiIYcMmA6uhefifvvwtuwbgdz3qLU',
    database: 'backend_rer6',
    entities: ['dist/**/*.entity.{ts,js}'], 
    synchronize: true,
    logging: true,
    dropSchema: false,
    ssl: {
        rejectUnauthorized: false, 
    },
})
