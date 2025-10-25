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