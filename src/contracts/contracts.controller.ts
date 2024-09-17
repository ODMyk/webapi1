import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/contract-update.dto';
import { GetContractDto } from './dtos/get-contract.dto';
import { PaginationQueryDto } from 'src/common/dtos/query-pagination.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly service: ContractsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async allContracts(@Query() query: PaginationQueryDto) {
    const { page, limit } = query;
    return await this.service.getAllContracts(page, limit);
  }

  @Get(':id')
  async ContractById(
    @Body(new ValidationPipe({ transform: true })) dto: GetContractDto,
  ) {
    const Contract = await this.service.getContractById(dto);
    if (!Contract) {
      throw new NotFoundException(
        `Contract between user with id ${dto.userId} and company with id ${dto.companyId} was not found`,
      );
    }

    return Contract;
  }

  @Post()
  async createContract(
    @Body(new ValidationPipe({ transform: true })) dto: CreateContractDto,
  ) {
    const contract = await this.service.createContract(dto);
    if (!contract) {
      throw new InternalServerErrorException('UNEXPECTED ERROR');
    }

    return contract;
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateContract(@Body(new ValidationPipe()) dto: UpdateContractDto) {
    const { count } = await this.service.updateContract(dto);
    if (!count) {
      throw new NotFoundException(
        `Contract between user with id ${dto.userId} and company with id ${dto.companyId} was not found`,
      );
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteContract(
    @Body(new ValidationPipe({ transform: true })) dto: GetContractDto,
  ) {
    const { count } = await this.service.deleteContract(dto);
    if (!count) {
      throw new NotFoundException(
        `Contract between user with id ${dto.userId} and company with id ${dto.companyId} was not found`,
      );
    }
  }
}
