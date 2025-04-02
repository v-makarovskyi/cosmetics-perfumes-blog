/*
  Warnings:

  - A unique constraint covering the columns `[first_name,last_name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Author_first_name_last_name_key" ON "Author"("first_name", "last_name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_url_key" ON "Image"("url");
