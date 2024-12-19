import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDB = () => {
    if (!prisma) {
        console.log("🛢 Database already connected");
    } else {
        console.log("🛢 Database connected successfully");
    }
    return prisma;
};

const disconnectDB = async () => {
    if (prisma) {
        await prisma.$disconnect();
        console.log("🛢 Database disconnected successfully");
    }
};

export { connectDB, disconnectDB, prisma };
