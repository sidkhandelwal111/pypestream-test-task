import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, { 
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      throw new BadRequestException(error);
    }
    
    return value;
  }
}