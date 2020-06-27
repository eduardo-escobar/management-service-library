/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { Book } from './interface/book';
import * as sql from 'mssql';

@Injectable()
export class BooksService {
    async getAllBooks() {
        try {
            return await new Promise<Book[]>((resolve, reject) => {
                this.processProcedure('GetBooks')
                    .then((record) => resolve(record))
                    .catch((error) => reject(error));
            });

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getTopBooks(top: number) {
        try {
            return await new Promise<Book[]>((resolve, reject) => {
                this.processProcedure('GetTopBooks', [{ nombre: 'top', value: top }])
                    .then((record) => resolve(record))
                    .catch((error) => reject(error));
            });

        } catch (err) {
            console.error(err);
            throw err;
        }

    }


    async getBookStockById(idLibro: number): Promise<Book[]> {
        try {
            return await new Promise<any[]>((resolve, reject) => {
                this.processProcedure('GetStockBook', [{ nombre: 'idlibro', value: idLibro }])
                    .then((record) => resolve(record))
                    .catch((error) => reject(error));
            });

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    processProcedure(nameProcedure: string, parameter?: any[]) {
        try {
            const pool = new sql.ConnectionPool(process.env.CS_PROD);
            return pool.connect().then(async () => {
                const request = new sql.Request(pool);
                parameter?.map(p => request.input(p.nombre, p.value));
                return request.execute(nameProcedure)
                    .then(result => {
                        return result.recordset;
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            })

        } catch (error) {
            throw error;
        }
    }
}
