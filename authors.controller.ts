import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './interfaces/author.interface';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Author[] {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Author {
    return this.authorsService.findOne(id);
  }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Author {
    return this.authorsService.create(createAuthorDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAuthorDto: UpdateAuthorDto): Author {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.authorsService.remove(id);
  }
}
