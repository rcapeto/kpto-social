-- CreateTable
CREATE TABLE "Developers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "techs" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "github" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "editAt" DATETIME,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    CONSTRAINT "Posts_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "developerId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "Comments_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "developerId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "Likes_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
