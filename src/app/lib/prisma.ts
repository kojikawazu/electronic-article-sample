import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// -------------------------------------------------------
// グローバルオブジェクト
// ホットリロードをしてもインスタンス化されないようにするため
// -------------------------------------------------------
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

// -------------------------------------------------------
// シングルトン
// -------------------------------------------------------
if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
}

prisma = globalForPrisma.prisma;
// -------------------------------------------------------

export default prisma;
