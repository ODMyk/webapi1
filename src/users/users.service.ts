import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async createUser(user: CreateUserDto) {
    return await this.prisma.user.create({ data: user });
  }

  async updateUser(id: number, user: UpdateUserDto) {
    return await this.prisma.user.updateMany({
      where: { id },
      data: user,
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.deleteMany({ where: { id } });
  }
}
