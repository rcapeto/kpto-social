-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "developerId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "Likes_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION,
    CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);
INSERT INTO "new_Likes" ("developerId", "id", "postId") SELECT "developerId", "id", "postId" FROM "Likes";
DROP TABLE "Likes";
ALTER TABLE "new_Likes" RENAME TO "Likes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
