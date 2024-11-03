import { PartialType } from '@nestjs/swagger';
import { CreateGardenerDto } from './create-gardener.dto';

export class UpdateGardenerDto extends PartialType(CreateGardenerDto) {}
