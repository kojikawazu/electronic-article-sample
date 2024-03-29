import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/app/lib/prisma";

// stripeインスタンス
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * prismaへ購入履歴を保存
 * @param request 
 * @param response 
 * @returns 
 */
export async function POST(request: Request, response: Response) {
    const { sessionId } = await request.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const existingPurchase = await prisma.purchase.findFirst({
            where: {
                userId: session.client_reference_id!,
                bookId: session.metadata?.bookId!,
            },
        });

        if (!existingPurchase) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: session.client_reference_id!,
                    bookId: session.metadata?.bookId!,
                },
            });

            return NextResponse.json({ purchase });
        } else {
            return NextResponse.json({ message: "既に購入済です。" });
        }
    } catch (err) {
        return NextResponse.json(err);
    }
}