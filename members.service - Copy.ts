import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './interfaces/member.interface';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  private members: Member[] = [];
  private idCounter = 1;

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: number): Member {
    const member = this.members.find(m => m.id === id);
    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
    return member;
  }

  create(createMemberDto: CreateMemberDto): Member {
    const newMember: Member = {
      id: this.idCounter++,
      ...createMemberDto,
    };
    this.members.push(newMember);
    return newMember;
  }

  update(id: number, updateMemberDto: UpdateMemberDto): Member {
    const member = this.findOne(id);
    const updatedMember = { ...member, ...updateMemberDto };
    const index = this.members.findIndex(m => m.id === id);
    this.members[index] = updatedMember;
    return updatedMember;
  }

  remove(id: number): void {
    const index = this.members.findIndex(m => m.id === id);
    if (index === -1) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }
    this.members.splice(index, 1);
  }
}
