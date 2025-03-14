/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userPassword" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "userRoleAtributed" TEXT NOT NULL
);
INSERT INTO "new_User" ("active", "createdAt", "id", "userEmail", "userPassword", "userRoleAtributed", "username") SELECT "active", "createdAt", "id", "userEmail", "userPassword", "userRoleAtributed", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
