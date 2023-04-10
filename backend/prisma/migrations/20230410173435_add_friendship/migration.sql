-- CreateTable
CREATE TABLE "_UserFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "Developers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "Developers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFriends_AB_unique" ON "_UserFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFriends_B_index" ON "_UserFriends"("B");
