import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async allUsers() {
    return await this.service.getAllUsers();
  }

  @Get(':id')
  async userById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    return user;
  }

  @Post()
  async createUser(@Body(new ValidationPipe()) dto: CreateUserDto) {
    const user = await this.service.createUser(dto);
    if (!user) {
      throw new InternalServerErrorException('UNEXPECTED ERROR');
    }

    return user;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UpdateUserDto,
  ) {
    const { count } = await this.service.updateUser(id, dto);
    if (!count) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const { count } = await this.service.deleteUser(id);
    if (!count) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
  }
}
