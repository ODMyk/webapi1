import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dtos/company-create.dto';
import { UpdateCompanyDto } from './dtos/company-update.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCompanies(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const companies = await this.prisma.company.findMany({
      skip,
      take: limit,
    });

    const totalCompanies = await this.prisma.company.count();

    return {
      data: companies,
      total: totalCompanies,
      page,
      limit,
      totalPages: Math.ceil(totalCompanies / limit),
    };
  }

  async getCompanyById(id: number) {
    return await this.prisma.company.findFirst({ where: { id } });
  }

  async createCompany(company: CreateCompanyDto) {
    const user = await this.prisma.user.findFirst({
      where: { id: company.ownerId },
    });
    if (!user) {
      return null;
    }

    return await this.prisma.company.create({ data: company });
  }

  async updateCompany(id: number, user: UpdateCompanyDto) {
    return await this.prisma.company.updateMany({
      where: { id },
      data: user,
    });
  }

  async updateCompanyLogo(id: number, logo: string) {
    return await this.prisma.company.updateMany({
      where: { id },
      data: { logo },
    });
  }

  async deleteCompany(id: number) {
    return await this.prisma.company.deleteMany({ where: { id } });
  }

  async changeOwner(id: number, ownerId: number) {
    const errors: string[] = [];
    const user = await this.prisma.user.findFirst({ where: { id: ownerId } });
    const company = await this.prisma.company.findFirst({ where: { id } });
    if (!user) {
      errors.push(`User with id ${ownerId} was not found`);
    }
    if (!company) {
      errors.push(`Company with id ${id} was not found`);
    }
    if (errors.length) {
      return { ok: false, errors };
    }

    const { count } = await this.prisma.company.updateMany({
      where: { id },
      data: { ownerId },
    });

    return { ok: count > 0, errors };
  }
}
