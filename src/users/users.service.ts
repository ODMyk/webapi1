import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserDto } from './dtos/user.dto';
import { GoogleAnalyticsService } from 'src/google-analytics/google-analytics.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elastic: ElasticsearchService,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
    });

    const totalUsers = await this.prisma.user.count();

    return {
      data: users,
      total: totalUsers,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / limit),
    };
  }

  async getUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: dto });

    await this.elastic.index({
      index: 'users',
      id: user.id.toString(),
      body: user,
    });

    await this.gaService.sendEvent('User_Created', { ...dto, id: user.id });

    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: dto,
      });

      await this.elastic.update({
        index: 'users',
        id: user.id.toString(),
        body: { doc: user },
      });
    } catch {
      return false;
    }
    return true;
  }

  async getUsersByName(name: string) {
    const result = await this.elastic.search({
      index: 'users',
      query: {
        match: { name },
      },
    });

    return result.hits.hits.map((hit) => hit._source) as UserDto[];
  }

  async deleteUser(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });

      await this.elastic.delete({
        index: 'users',
        id: id.toString(),
      });
    } catch {
      return false;
    }
    return true;
  }
}
