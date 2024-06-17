import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto"

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    uid: "",
    email: "admin@seed.com",
    password: "admin",
    role: "ADMIN",
  },
  {
    uid: "",
    email: "mod@seed.com",
    password: "mod",
    role: "MOD",
  },
  {
    uid: "",
    email: "user@seed.com",
    password: "user",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  await prisma.user.deleteMany();
  for (const u of userData) {
    const hashedPassword = await bcrypt.hash(u.password, 9);
    const user = await prisma.user.create({
      data: {
        uid: crypto.randomUUID(),
        email: u.email,
        password: hashedPassword,
        role: u.role
      }
    });
    console.log(`Created user with uid: ${user.uid}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
