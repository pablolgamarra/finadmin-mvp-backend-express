/*
  Warnings:

  - Added the required column `comentarios` to the `Acreedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Acreedor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Acreedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "comentarios" TEXT NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL
);
INSERT INTO "new_Acreedor" ("fechaActualizacion", "fechaCreacion", "id", "nombre") SELECT "fechaActualizacion", "fechaCreacion", "id", "nombre" FROM "Acreedor";
DROP TABLE "Acreedor";
ALTER TABLE "new_Acreedor" RENAME TO "Acreedor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
