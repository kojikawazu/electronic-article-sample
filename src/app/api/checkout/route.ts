import { NextResponse } from "next/server";
import Stripe from "stripe";

// Stripeインスタンス
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Stripeのチェックアウト[POST]
 * @param request 
 * @param response 
 * @returns 
 */
export async function POST(request: Request, response: Response) {
    const { title, price, bookId, userId } = await request.json();

    try {
        // Stripeへ登録
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            metadata: {
                bookId: bookId,
            },
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: "jpy",
                        product_data: {
                            name: title,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        });

        // 成功後、チェックアウトURLへ遷移
        return NextResponse.json({ checkout_url: session.url });
    } catch (err: any) {
        // 失敗・・・
        return NextResponse.json(err.message);
    }
}