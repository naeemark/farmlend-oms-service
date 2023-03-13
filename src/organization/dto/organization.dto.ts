import { ApiProperty } from "@nestjs/swagger";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false
})
export class OrganizationDto {
  @ApiProperty({ example: "Green Farms Ltd." })
  @JoiSchema(Joi.string().required())
  name?: string;

  @ApiProperty({ default: "seller", enum: ["seller", "buyer"] })
  @JoiSchema(
    Joi.string()
      .lowercase()
      .valid(...["seller", "buyer"])
  )
  type?: string;
}
