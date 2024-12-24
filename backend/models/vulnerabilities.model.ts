// backend/models/vulnerabilities.model.ts
import { prisma } from "../config/db.config";

export const create = async (data: any) => {
    return await prisma.vulnerabilities.create({
        data,
    });
}

export const getAll = async (filters: any) => {
    return await prisma.vulnerabilities.findMany();
}

export const findById = async (id: string) => {
    return await prisma.vulnerabilities.findUnique({
        where: { id },
    });
}

export const update = async (id: string, data: any) => {
    return await prisma.vulnerabilities.update({
        where: { id },
        data,
    });
}

export const remove = async (id: string) => {
    return await prisma.vulnerabilities.delete({
        where: { id },
    });
};