-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "editAt" DATETIME,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    CONSTRAINT "Posts_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Posts" ("createdAt", "description", "developerId", "editAt", "id", "thumbnail", "title") SELECT "createdAt", "description", "developerId", "editAt", "id", "thumbnail", "title" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "Comments_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("createdAt", "developerId", "id", "postId", "text") SELECT "createdAt", "developerId", "id", "postId", "text" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
