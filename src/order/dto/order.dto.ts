import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";
import { ProductDto } from "src/product/dto/product.dto";

@JoiSchemaOptions({
  allowUnknown: true
})
export class OrderDto {
  @ApiProperty({ default: "seller", enum: ["seller", "buyer"] })
  @JoiSchema(
    Joi.string()
      .lowercase()
      .valid(...["seller", "buyer"])
  )
  type?: string;

  @ApiProperty({ example: "1" })
  @JoiSchema(Joi.number().integer().optional())
  order?: OrderDto;

  @ApiProperty({ example: "[1, 2, 3]" })
  @JoiSchema(Joi.array().items(Joi.number()).unique().optional())
  products?: ProductDto[];
}
