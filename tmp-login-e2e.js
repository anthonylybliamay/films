const { PrismaClient } = require('./lib/generated/prisma');
const bcrypt = require('bcryptjs');
const http = require('http');
const prisma = new PrismaClient();
(async () => {
  const email = 'test-login@example.com';
  const password = 'Test123456!';
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { firstName: 'Test', lastName: 'Login', email, password: hashed } }).catch((err) => {
    if (err.code !== 'P2002') throw err;
  });

  const payload = JSON.stringify({ email, password });
  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
  }, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('STATUS', res.statusCode);
      console.log(body);
      prisma.$disconnect();
    });
  });

  req.on('error', (err) => { console.error(err); prisma.$disconnect(); process.exit(1); });
  req.write(payload);
  req.end();
})().catch((err) => { console.error(err); prisma.$disconnect(); process.exit(1); });
