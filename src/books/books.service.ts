/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { SqlClient, CallProcedureCb } from "msnodesqlv8";
import { Book } from './interface/book';

const sql: SqlClient = require("msnodesqlv8");

@Injectable()
export class BooksService {
    async getAllBooks(): Promise<Book[]> {
        try {
            return await new Promise<Book[]>((resolve) => {

                this.processProcedure((err, results, output) => {
                    resolve(results);
                }, 'GetBooks')

            });

        } catch (err) {
            console.error(err)
        }
    }

    async getTopBooks(top: number): Promise<Book[]> {
        try {
            return await new Promise<Book[]>((resolve) => {

                this.processProcedure((err, results, output) => {
                    resolve(results);
                }, 'GetTopBooks', [top])

            });

        } catch (err) {
            console.error(err)
        }
    }


    async getBookStockById(idLibro: number): Promise<Book[]> {
        try {
            return await new Promise<any[]>((resolve) => {

                this.processProcedure((err, results, output) => {
                    resolve(results);
                }, 'GetStockBook', [idLibro])

            });

        } catch (err) {
            console.error(err)
        }
    }

    processProcedure(functionProcedure: CallProcedureCb, nameProcedure: string, parameters: any[] = []): void {
        
        return sql.open(process.env.CS, (err, conn) => {
            const pm = conn.procedureMgr();
            return pm.callproc(nameProcedure, parameters, functionProcedure);
        });
    }
}
