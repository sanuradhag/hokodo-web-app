export type Book = {
    id: string;
    cover: string;
    isbn: string;
    title: string;
    subtitle: string;
    author: string;
    published: string;
    publisher: string;
    pages: number;
    description:string;
    website: string;
}

export type BookListResponse = {
    books: Book[]
}