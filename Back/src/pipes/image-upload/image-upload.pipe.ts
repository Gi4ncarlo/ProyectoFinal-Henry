import {BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageUploadPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif"
  ]

  private readonly maxSizeInBytes = 20000000
  transform(file : Express.Multer.File) {
    if(!file){
      throw new BadRequestException("No file Uploaded");
    }

    if(!this.allowedMimeTypes.includes(file.mimetype)){
      throw new BadRequestException("Invalid Mime Type")
    }

    if(file.size > this.maxSizeInBytes){
      throw new BadRequestException("File is to large");
    }
    return file;
  }
}