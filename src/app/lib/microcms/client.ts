import { BookType } from '@/app/types/types';
import { createClient } from 'microcms-js-sdk';

// microCMS（ヘッドレスCMS）のJavaScript SDKを使用して、特定のコンテンツ（この場合は書籍）を取得するための関数を定義

// microCMSクライアントの設定
export const client = createClient({
    serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
    apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

// 書籍データの取得
export const getAllBooks = async () => {
    const allBooks = await client.getList<BookType>({
        endpoint: "e-book",
    });

    return allBooks;
};

// 特定の書籍データの取得
export const getDetailBook = async (contentId: string) => {
    const detailBook = await client.getListDetail<BookType>({
        endpoint: "e-book",
        contentId,
    });

    return detailBook;
};