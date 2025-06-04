#!/bin/bash
npm install
npx prisma generate --schema=./prisma/schema.prisma
npx prisma generate --schema=./prisma/mongodb.prisma
npm run build 