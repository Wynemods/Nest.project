import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './interfaces/member.interface';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(): Member[] {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Member {
    return this.membersService.findOne(id);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto): Member {
    return this.membersService.create(createMemberDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMemberDto: UpdateMemberDto): Member {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.membersService.remove(id);
  }
}
