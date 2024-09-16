import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/company-create.dto';
import { UpdateCompanyDto } from './dtos/company-update.dto';
import { ChangeCompanyLogoDto } from './dtos/company-change-logo.dto';
import { ChangeCompanyOwnerDto } from './dtos/company-change-owner.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Get()
  async allCompanies() {
    return await this.service.getAllCompanies();
  }

  @Get(':id')
  async companyById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.getCompanyById(id);
    if (!user) {
      throw new NotFoundException(`Company with id ${id} was not found`);
    }

    return user;
  }

  @Post()
  async createCompany(
    @Body(new ValidationPipe({ transform: true })) dto: CreateCompanyDto,
  ) {
    const company = await this.service.createCompany(dto);
    if (!company) {
      throw new BadRequestException(
        `User with id ${dto.ownerId} was not found`,
      );
    }

    return company;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UpdateCompanyDto,
  ) {
    const ok = await this.service.updateCompany(id, dto);
    if (!ok) {
      throw new NotFoundException(`Company with id ${id} was not found`);
    }
  }

  @Patch(':id/logo')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCompanyLogo(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) { logo }: ChangeCompanyLogoDto,
  ) {
    const ok = await this.service.updateCompanyLogo(id, logo);
    if (!ok) {
      throw new NotFoundException(`Company with id ${id} was not found`);
    }
  }

  @Patch(':id/owner')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCompanyOwner(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    { ownerId }: ChangeCompanyOwnerDto,
  ) {
    const { ok, errors } = await this.service.changeOwner(id, ownerId);
    if (!ok) {
      throw new BadRequestException(errors);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompanyById(@Param('id', ParseIntPipe) id: number) {
    const ok = await this.service.deleteCompany(id);
    if (!ok) {
      throw new NotFoundException(`Company with id ${id} was not found`);
    }
  }
}
