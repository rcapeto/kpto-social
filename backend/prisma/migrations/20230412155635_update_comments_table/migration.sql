/*
  Warnings:

  - Added the required column `text` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "Comments_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("createdAt", "developerId", "id", "postId") SELECT "createdAt", "developerId", "id", "postId" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
