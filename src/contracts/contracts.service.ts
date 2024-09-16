import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetContractDto } from './dtos/get-contract.dto';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/contract-update.dto';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllContracts(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const contracts = await this.prisma.contract.findMany({
      skip,
      take: limit,
    });

    const totalContracts = await this.prisma.contract.count();

    return {
      data: contracts,
      total: totalContracts,
      page,
      limit,
      totalPages: Math.ceil(totalContracts / limit),
    };
  }

  async getContractById(dto: GetContractDto) {
    return await this.prisma.contract.findFirst({ where: dto });
  }

  async createContract(contract: CreateContractDto) {
    return await this.prisma.contract.create({ data: contract });
  }

  async updateContract(contract: UpdateContractDto) {
    return await this.prisma.contract.updateMany({
      where: { userId: contract.userId, companyId: contract.companyId },
      data: contract,
    });
  }

  async deleteContract(dto: GetContractDto) {
    return await this.prisma.contract.deleteMany({ where: dto });
  }
}
