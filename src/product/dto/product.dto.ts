import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";
import { OrganizationDto } from "./../../organization/dto/organization.dto";

@JoiSchemaOptions({
  allowUnknown: false
})
export class ProductDto {
  @ApiProperty({ example: "Apple" })
  @JoiSchema(Joi.string().required())
  category?: string;

  @ApiProperty({ default: "Gala" })
  @JoiSchema(Joi.string().required())
  variety?: string;

  @ApiProperty({ default: "18KG Boxes" })
  @JoiSchema(Joi.string().required())
  packaging?: string;

  @ApiProperty({ example: "1" })
  @JoiSchema(Joi.number().integer().required())
  organization?: OrganizationDto;
}
