import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];
  private idCounter = 1;

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    const author = this.authors.find(a => a.id === id);
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  create(createAuthorDto: CreateAuthorDto): Author {
    const newAuthor: Author = {
      id: this.idCounter++,
      ...createAuthorDto,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): Author {
    const author = this.findOne(id);
    const updatedAuthor = { ...author, ...updateAuthorDto };
    const index = this.authors.findIndex(a => a.id === id);
    this.authors[index] = updatedAuthor;
    return updatedAuthor;
  }

  remove(id: number): void {
    const index = this.authors.findIndex(a => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    this.authors.splice(index, 1);
  }
}
