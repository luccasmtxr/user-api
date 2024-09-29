import {PrismaClient} from "@prisma/client";
import { TUserCreate, TUserUpdate } from "./types";

const prisma = new PrismaClient({
    errorFormat: 'pretty',
  })

export async function getUsers() {
  return prisma.user.findMany();
}

export async function createUser(data: TUserCreate) {
  return prisma.user.create({
    data,
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function updateUser(userId: string, data: TUserUpdate) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}

export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}