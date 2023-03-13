import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { OrganizationDto } from "./dto/organization.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Organization } from "./entities/organization.entity";

@Controller({ version: "1", path: "organizations" })
@ApiTags("Organizations")
@ApiResponse({ status: 400, description: "Bad Request: validation error!" })
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: "Create a organization" })
  @ApiResponse({ status: 201, description: "Created", type: Organization })
  create(@Body() createOrganizationDto: OrganizationDto) {
    return this.service.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: "List all organizations" })
  @ApiResponse({ status: 200, description: "List of organizations", type: [Organization] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get organization by id" })
  @ApiResponse({ status: 200, description: "Organization found", type: Organization })
  @ApiResponse({ status: 404, description: "Organization not found" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update organization" })
  @ApiResponse({ status: 200, description: "Updated the organization", type: Organization })
  update(@Param("id") id: string, @Body() dto: OrganizationDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete organization" })
  @ApiResponse({ status: 200, description: "Deleted the organization", type: Organization })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
