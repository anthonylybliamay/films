const { PrismaClient } = require('./lib/generated/prisma');
const prisma = new PrismaClient();
(async () => {
  const email1 = 'anto@lbm.fr';
  const email2 = 'ANTO@LBM.FR';
  const user1 = await prisma.user.findUnique({ where: { email: email1 } });
  const user2 = await prisma.user.findUnique({ where: { email: email2 } });
  console.log('email1', !!user1, user1?.email);
  console.log('email2', !!user2, user2?.email);
  await prisma.$disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
