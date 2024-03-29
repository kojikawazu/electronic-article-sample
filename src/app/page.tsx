import { getServerSession } from "next-auth";
import { getAllBooks } from "./lib/microcms/client";
import { nextAuthOptions } from "./lib/next-auth/options";
import { BookType, Purchase, User } from "./types/types";
import Book from "./components/Book";

/**
 * ホームページ
 * @returns JSX
 */
// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {

  // サーバーサイドのコンテキストでセッション情報を取得するために使用
  const session = await getServerSession(nextAuthOptions);
  // ユーザーセッションの取得
  const user: User = session?.user as User;

  // microCMS(ヘッドレスCMS)から書籍データを取得する
  const { contents } = await getAllBooks();

  // Next.js API Router(Prisma)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user?.id}`,
    { cache: "no-store" } // SSR
  );
  const purchasesData = await response.json();
  const purchaseBookIds = purchasesData.map(
    (purchaseBook: Purchase) => purchaseBook.bookId
  );

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            user={user}
            isPurchased={purchaseBookIds.includes(book.id)} />
        ))}
      </main>
    </>
  );
};
