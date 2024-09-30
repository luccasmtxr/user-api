import { PrismaClient } from "@prisma/client";
import { TloginRead } from "./types";

const prisma = new PrismaClient({
    errorFormat: 'pretty',
})

  export const getAdminUserByUsername = async (username: string) => {
    const adminUser = await prisma.admin.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  
    if (adminUser) {
      return adminUser as TloginRead;
    }
  
    return null;
  };
 
  export const getAdminUserById = async (id: string) => {
    const adminUser = await prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  
    if (adminUser) {
      return adminUser as TloginRead;
    }
  
    return null;
  };
