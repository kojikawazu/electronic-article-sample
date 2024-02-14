import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

/**
 * prismaからpurchase取得[GET]
 * @param request 
 * @param params userId
 * @returns JSON
 */
export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    const userId = params.userId;

    try {
        const purchases = await prisma.purchase.findMany({
            where: { userId: userId },
        });

        return NextResponse.json(purchases);
    } catch (err) {
        console.error(err);
        return NextResponse.json(err);
    }
}