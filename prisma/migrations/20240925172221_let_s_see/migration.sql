/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitorAdminLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VisitorAdminLink" DROP CONSTRAINT "VisitorAdminLink_adminId_fkey";

-- DropForeignKey
ALTER TABLE "VisitorAdminLink" DROP CONSTRAINT "VisitorAdminLink_visitorId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VisitorAdminLink";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" CHAR(10) NOT NULL,
    "role" "Role" NOT NULL,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitorAdminLink" (
    "id" SERIAL NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitorAdminLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_phoneNumber_key" ON "user"("email", "phoneNumber");

-- AddForeignKey
ALTER TABLE "visitorAdminLink" ADD CONSTRAINT "visitorAdminLink_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitorAdminLink" ADD CONSTRAINT "visitorAdminLink_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
