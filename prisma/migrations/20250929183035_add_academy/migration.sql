/*
  Warnings:

  - Added the required column `academyId` to the `MembershipPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyId` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MembershipPlan" ADD COLUMN     "academyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trainer" ADD COLUMN     "academyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "academyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Academy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Academy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Academy_email_key" ON "public"."Academy"("email");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "public"."Academy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembershipPlan" ADD CONSTRAINT "MembershipPlan_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "public"."Academy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trainer" ADD CONSTRAINT "Trainer_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "public"."Academy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
