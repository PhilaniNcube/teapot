"use server"

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getBooks() {

    const payload = await getPayload({
        config,
    });

    const booksData = await payload.find({
       collection: "books",
    });

    return booksData;

}

export async function getBookById(id: number) {

    const payload = await getPayload({
        config,
    });

    const bookData = await payload.findByID({
        collection: "books",
        id: id.toString(),
    });

    return bookData;
}
