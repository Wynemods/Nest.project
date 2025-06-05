import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private idCounter = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.idCounter++,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const book = this.findOne(id);
    const updatedBook = { ...book, ...updateBookDto };
    const index = this.books.findIndex(b => b.id === id);
    this.books[index] = updatedBook;
    return updatedBook;
  }

  remove(id: number): void {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books.splice(index, 1);
  }
}
