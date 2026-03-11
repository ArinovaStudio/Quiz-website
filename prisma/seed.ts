import { Role } from "@prisma/client";
import { seedData } from "./seedData";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Starting Database Seeding...");

  console.log("Wiping database clean...");
  
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.userResponse.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.bots.deleteMany();
  
  await prisma.tournament.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  
  await prisma.tokenHistory.deleteMany();
  await prisma.transactionHistory.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  
  await prisma.plan.deleteMany();
  await prisma.otp.deleteMany();
  await prisma.logTraffic.deleteMany();
  await prisma.banner.deleteMany();

  console.log("Database cleared successfully!\n");

  console.log("Seeding Users...");

  const password = await bcrypt.hash('password123', 12);

  for (const userData of seedData.users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        name: userData.name,
        email: userData.email,
        password: password, 
        role: userData.role,
        isProfileComplete: true,
        wallet: {
          create: { balance: userData.role === Role.ADMIN ? 10000 : 100 }
        }
      }
    });
  }

  console.log("Seeding Plans...");
  for (const planData of seedData.plans) {
    await prisma.plan.deleteMany({ where: { title: planData.title } });
    await prisma.plan.create({ data: planData });
  }

  console.log("Seeding Categories & Tournaments...");
  
  const startTime = new Date(); 
  const windowOpenTime = new Date(startTime.getTime() - 15 * 60 * 1000); 
  const endTime = new Date();
  endTime.setFullYear(endTime.getFullYear() + 1);

  for (const catData of seedData.categories) {

    const category = await prisma.category.upsert({
      where: { name: catData.name },
      update: {},
      create: { name: catData.name }
    });

    const createdSubCats = [];
    for (const subName of catData.subCategories) {
      const sub = await prisma.subCategory.upsert({
        where: { name: subName },
        update: {},
        create: { name: subName, categoryId: category.id }
      });
      createdSubCats.push(sub);
    }

    const tData = catData.tournament;
    const tournament = await prisma.tournament.create({
      data: {
        title: tData.title,
        description: tData.description,
        categoryId: category.id,
        subCategoryId: createdSubCats[0].id,
        startTime,
        windowOpenTime,
        endTime,
        durationPerQ: tData.durationPerQ,
        totalQuestions: tData.totalQuestions,
        difficulty: tData.difficulty,
        totalSeats: tData.totalSeats,
        winningSeats: tData.winningSeats,
        entryFee: tData.entryFee,
        prizePool: tData.prizePool,
        language: "ENGLISH",
        
        questions: {
          create: tData.questions.map((q) => ({
            text: q.text,
            options: {
              create: q.options.map((opt) => ({
                text: opt.text,
                isCorrect: opt.isCorrect
              }))
            }
          }))
        }
      }
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });