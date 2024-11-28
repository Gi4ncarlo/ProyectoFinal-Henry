import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Res } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { Response } from "express";

@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService
    ) { }

    @Post('create/:id')
    async createReview(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: any, @Res() res: Response) {
        try {
            const review = await this.reviewsService.createReview(id, body);
            return res.status(200).send(review);
        } catch (error) {
            return res.status(400).send(error);

        }
    }
}