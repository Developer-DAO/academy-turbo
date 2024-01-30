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
  // const newLesson = await prisma.lessons.create({
  //   data: {
  //     lessonTitle: "Introduction to Smart Contract Development with Solidity",
  //     lessonDescription:
  //       "Beginner-friendly. Create your first Solidity smart contract and learn the fundamentals of blockchain development. Checkpoint quizzes included.",
  //     imgPath: "/image16.png",
  //     lessonPath: "/tracks/nft-solidity/1",
  //     quizFileName: "nft-solidity/quiz-nft-solidity-1",
  //     trackId: "clrzjah6u00001w2ndxrq8dou",
  //   },
  // });
  // console.log({ newLesson });
  // const newTagOnTracks = await prisma.tagsOnTracks.create({
  //   data: {
  //     tagId: "clrzv8iyi00001wm0eewbxc4b",
  //     trackId: "clrzjah6u00001w2ndxrq8dou",
  //   },
  // });
  // console.log({ newTagOnTracks });
  const newTagsOnLesson = await prisma.tagsOnLessons.create({
    data: {
      lessonId: "clrzkw6sp00091wtu66sggity",
      tagId: "clrzjqdet00031wm1tu55ohp7",
    },
  });
  console.log({ newTagsOnLesson });
  // const newTag = await prisma.tags.create({
  //   data: {
  //     tagName: "UI",
  //     tagDescription: "UI",
  //   },
  // });
  // console.log({ newTag });
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
