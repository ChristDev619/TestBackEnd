/*
  Warnings:

  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `whats_hot` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "discovery_source" VARCHAR(20),
ADD COLUMN     "name" VARCHAR(150),
ADD COLUMN     "phone" VARCHAR(20);

-- DropTable
DROP TABLE "article";

-- DropTable
DROP TABLE "whats_hot";

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
