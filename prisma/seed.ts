import { hashPassword } from '../src/utils/bcryptHandler';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient({
    errorFormat: 'pretty',
})

async function getAdmin(): Promise<any> {
  const password = 'admin';
  const hashedPassword = await hashPassword(password);
  return {
    id: uuidv4(),
    username: 'admin',
    password: hashedPassword,
  };
}


async function seed() {
  console.log(`Start seeding ...`)
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();

  const adminUser = await getAdmin();

  await prisma.admin.create({
    data: {
      ...adminUser,
    },
  });

  console.log(`Ended seeding ...`)


}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })