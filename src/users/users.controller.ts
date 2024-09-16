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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PaginationQueryDto } from 'src/common/dtos/query-pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async allUsers(@Query() query: PaginationQueryDto) {
    const { page, limit } = query;
    return await this.service.getAllUsers(page, limit);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    return user;
  }

  @Get('/byname/:name')
  async getUsersByName(@Param('name') name: string) {
    return await this.service.getUsersByName(name);
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
    const ok = await this.service.updateUser(id, dto);
    if (!ok) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const ok = await this.service.deleteUser(id);
    if (!ok) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
  }
}
