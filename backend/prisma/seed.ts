import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@weatherguard.local';
  const password = process.env.ADMIN_PASSWORD ?? 'Admin@123';

  await prisma.user.upsert({
    where: { email },
    update: {
      role: 'ADMIN',
      status: 'APPROVED',
      passwordHash: await bcrypt.hash(password, 10),
    },
    create: {
      email,
      name: 'WeatherGuard Admin',
      city: 'Delhi',
      role: 'ADMIN',
      status: 'APPROVED',
      passwordHash: await bcrypt.hash(password, 10),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
