import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dtos/company-create.dto';
import { UpdateCompanyDto } from './dtos/company-update.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { GoogleAnalyticsService } from 'src/google-analytics/google-analytics.service';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  async getAllCompanies() {
    const cached = await this.cache.get('all');
    if (cached) {
      return cached;
    }

    const companies = await this.prisma.company.findMany();

    await this.cache.set('all', companies);

    return companies;
  }

  async getCompanyById(id: number) {
    const cached = await this.cache.get(id.toString());
    if (cached) {
      return cached;
    }
    const company = await this.prisma.company.findFirst({ where: { id } });

    await this.cache.set(id.toString(), company);

    return company;
  }

  async createCompany(dto: CreateCompanyDto) {
    const exists = await this.prisma.company.findFirst({
      where: { id: dto.ownerId },
    });
    if (exists) {
      return null;
    }

    const company = await this.prisma.company.create({ data: dto });
    await this.cache.set(company.id.toString(), company);
    await this.gaService.sendEvent('Company_Created', company);

    return company;
  }

  async updateCompany(id: number, dto: UpdateCompanyDto) {
    try {
      await this.prisma.company.update({
        where: { id },
        data: dto,
      });

      await this.cache.del(id.toString());
    } catch {
      return false;
    }

    return true;
  }

  async updateCompanyLogo(id: number, logo: string) {
    try {
      await this.prisma.company.update({
        where: { id },
        data: { logo },
      });

      await this.cache.del(id.toString());
    } catch {
      return false;
    }

    return true;
  }

  async deleteCompany(id: number) {
    try {
      await this.prisma.company.delete({
        where: { id },
      });

      await this.cache.del(id.toString());
    } catch {
      return false;
    }

    return true;
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

    try {
      await this.prisma.company.update({
        where: { id },
        data: user,
      });

      await this.cache.del(id.toString());
    } catch {
      return { ok: false, errors };
    }

    return { ok: true, errors };
  }
}
