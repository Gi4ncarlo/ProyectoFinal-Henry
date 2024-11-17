import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';



@Injectable()
export class MercadoPagoService {
    constructor() { }
    async createPayment(id: string, title: string, quantity: number, unit_price: number, user:any) {
        const client = new MercadoPagoConfig(
            {
                accessToken: 'TEST-3728560213952663-111517-c3f722e5628bac5e409e2c14d8b04de6-145773953'
            }
        );
        const preference = new Preference(client)

        preference.create({
            body: {
                items:
                    [
                        {
                            id,
                            title,
                            quantity,
                            unit_price,
                            currency_id: 'ARS',
                        }
                    ],
                payer: {
                    name: user.name,
                    email:user.email,
                        },
                auto_return: 'approved',
                back_urls: {
                    success: 'http://localhost:3000/mercadopago/success',
                    failure: 'http://localhost:3000/mercadopago/failure',
                    pending: 'http://localhost:3000/mercadopago/pending',
                },
            }
        })
            .then(console.log)
            .catch(console.error);
    }
}