/*
  Warnings:

  - A unique constraint covering the columns `[email,phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_email_phoneNumber_key" ON "User"("email", "phoneNumber");
