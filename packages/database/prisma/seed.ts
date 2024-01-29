// import { PrismaClient } from "../client";
// import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const password = await hash("password123", 12);
  // const user = await prisma.user.upsert({
  //   where: { email: "admin@admin.com" },
  //   update: {},
  //   create: {
  //     email: "admin@admin.com",
  //     name: "Admin",
  //     password,
  //   },
  // });
  // console.log({ user });

  const newLesson = await prisma.lessons.create({
    data: {
      lessonTitle: "Introduction to Smart Contract Development with Solidity",
      lessonDescription:
        "Beginner-friendly. Create your first Solidity smart contract and learn the fundamentals of blockchain development. Checkpoint quizzes included.",
      imgPath: "/image16.png",
      lessonPath: "/tracks/nft-solidity/1",
      quizFileName: "nft-solidity/quiz-nft-solidity-1",
      trackId: "clrzjah6u00001w2ndxrq8dou",
    },
  });

  console.log({ newLesson });

  const newLesson2 = await prisma.lessons.create({
    data: {
      lessonTitle: "Crafting a Basic NFT: A Step-by-Step ERC-721 Tutorial for Beginners",
      lessonDescription:
        "Use pro developer tools  and libraries to create and host your first ERC-721 NFT, for real world professional projects. Checkpoint quizzes included.",
      imgPath: "/image16.png",
      lessonPath: "nft-solidity/quiz-nft-solidity-2",
      quizFileName: "intro-to-ethereum/quiz-eth-intro-2",
      trackId: "clrzjah6u00001w2ndxrq8dou",
    },
  });

  console.log({ newLesson2 });

  const newLesson3 = await prisma.lessons.create({
    data: {
      lessonTitle: "TierNFTs",
      lessonDescription:
        "Create your first ERC-721 tiered NFT collection with an array of dev tools with probing quizzes along the way. Adapt your project for professional use cases.",
      imgPath: "/image16.png",
      lessonPath: "/tracks/nft-solidity/3",
      quizFileName: "nft-solidity/quiz-nft-solidity-3",
      trackId: "clrzjah6u00001w2ndxrq8dou",
    },
  });

  console.log({ newLesson3 });

  const newLesson4 = await prisma.lessons.create({
    data: {
      lessonTitle: "Smart Contracts: Automated Testing and Test-Driven Development (TDD)",
      lessonDescription:
        "Learn Test Driven Development from the best. A crucial skill for Solidity developers. A necessity in blockchain eco-systems. Your automated tests keep us safe.",
      imgPath: "/image16.png",
      lessonPath: "/tracks/nft-solidity/4",
      quizFileName: "nft-solidity/quiz-nft-solidity-4",
      trackId: "clrzjah6u00001w2ndxrq8dou",
    },
  });

  console.log({ newLesson4 });

  const newLesson5 = await prisma.lessons.create({
    data: {
      lessonTitle: "Connect your Smart Contract to a Front End Application",
      lessonDescription:
        "Learn to seamlessly integrate your smart contracts with a user friendly front-end interface, utilising web3 libraries. With engaging quizzes along the way.",
      imgPath: "/image16.png",
      lessonPath: "/tracks/nft-solidity/5",
      quizFileName: "nft-solidity/quiz-nft-solidity-5",
      trackId: "clrzjah6u00001w2ndxrq8dou",
    },
  });

  console.log({ newLesson5 });

  // const newTag = await prisma.tags.create({
  //   data: {
  //     tagName: "Python",
  //     tagDescription: "Python",
  //   },
  // });
  // console.log(newTag);
  // const updatedTag = await prisma.tags.update({
  //   where: {
  //     id: "clrziyukf00001w75gtwlvhas",
  //   },
  //   data: {
  //     tagDescription: "Solidity",
  //   },
  // });
  // console.log({ updatedTag });
  // const deletedTag = await prisma.tags.delete({
  //   where: {
  //     id: "clrziz9w600001wenyxfrez3w",
  //   },
  // });
  // console.log({ deletedTag });
  // const newLesson = await prisma.tracks.create({
  //   data: {
  //     trackName: "Build a Fungible Token",
  //     trackTitle: "Build a Fungible Token",
  //     authors: ["7i7o", "piablo"],
  //     imgPath: "/image16.png",
  //     trackDescription:
  //       "Start with Solidity basics, or move straight on to creating an ERC-20 token using the Foundry development toolchain. Later, we'll explore more advanced concepts with real-world use cases, and best practices for creating and managing blockchain assets.",
  //     trackPath: "/tracks/erc-20-solidity",
  //   },
  // });
  // console.log({ newLesson });
  // const deletedCompletedLog = await prisma.user.deleteMany({});
  // console.log({ deletedCompletedLog });
  // const completed2 = await prisma.completedQuizzes.create({
  //   data: {
  //     userId: "cll3hcuim00001wujlay766tk",
  //     lesson: "2",
  //     completed: true,
  //   },
  // });
  // console.log({ completed2 });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
