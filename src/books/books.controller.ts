/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Res, HttpStatus, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private bookSv: BooksService) { }
    @Get()
    findAll(@Res() response, @Query('top') top) {

        (top === undefined ? this.bookSv.getAllBooks() : this.bookSv.getTopBooks(top))
            .then(book => {
                response.status(HttpStatus.OK).json({ book });
            })
            .catch(error => response.status(HttpStatus.FORBIDDEN).json(error));
    }

    @Get(':id')
    findStock(@Res() response, @Param('id') idLibro) {
        this.bookSv.getBookStockById(idLibro)
            .then(book => {
                response.status(HttpStatus.OK).json({ data: book })
            })
            .catch(error => response.status(HttpStatus.FORBIDDEN).json(error));
    }

}
