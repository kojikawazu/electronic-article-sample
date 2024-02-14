import { getServerSession } from "next-auth";
import Image from "next/image";
import { nextAuthOptions } from "../lib/next-auth/options";
import { BookType, Purchase, User } from "../types/types";
import { getDetailBook } from "../lib/microcms/client";
import PurchaseDetailBook from "../components/PurchaseDetailBook";

/**
 * プロフィールページ
 * @returns JSX
 */
export default async function ProfilePage() {

    // サーバーサイドのコンテキストでセッション情報を取得するために使用
    const session = await getServerSession(nextAuthOptions);
    // ユーザーセッションの取得
    const user: User = session?.user as User;

    // Next.js API Router(Prisma)
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
        { cache: "no-store" } // SSR
    );
    const purchasesData = await response.json();

    // microCMS(ヘッドレスCMS)(特定の書籍データの取得)
    const purchasesDetailBooks: BookType[] = await Promise.all(
        purchasesData.map(async (purchase: Purchase) => {
            return await getDetailBook(purchase.bookId);
        })
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">プロフィール</h1>

            <div className="bg-white shadow-md rounded p-4">
                <div className="flex items-center">
                    <Image
                        priority
                        src={user.image || "/default_icon.png"}
                        alt="user profile_icon"
                        width={60}
                        height={60}
                        className="rounded-t-md"
                    />
                    <h2 className="text-lg ml-4 font-semibold">お名前： {user.name}</h2>
                </div>
            </div>

            <span className="font-medium text-lg mb-4 mt-4 block">購入した記事</span>
            <div className="flex items-center gap-6">
                {purchasesDetailBooks.map((purchaseDetailBook: BookType) => (
                    <PurchaseDetailBook
                        key={purchaseDetailBook.id}
                        purchaseDetailBook={purchaseDetailBook} />
                ))}
            </div>
        </div>
    );
}