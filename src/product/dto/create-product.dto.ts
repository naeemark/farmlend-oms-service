import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: true
})
export class CreateProductDto {
  @ApiProperty({ example: "Apple" })
  @JoiSchema(Joi.string().required())
  category?: string;

  @ApiProperty({ default: "Gala" })
  @JoiSchema(Joi.string().required())
  variety?: string;

  @ApiProperty({ default: "18KG Boxes" })
  @JoiSchema(Joi.string().required())
  packaging?: string;
  createdAt?: Date;
}
