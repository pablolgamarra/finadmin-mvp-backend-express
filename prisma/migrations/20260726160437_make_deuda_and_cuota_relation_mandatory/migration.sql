/*
  Warnings:

  - Made the column `deudaId` on table `Cuota` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cuota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orden" INTEGER NOT NULL,
    "monto" DECIMAL NOT NULL,
    "fechaVencimiento" DATETIME,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    "deudaId" INTEGER NOT NULL,
    CONSTRAINT "Cuota_deudaId_fkey" FOREIGN KEY ("deudaId") REFERENCES "Deuda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cuota" ("deudaId", "fechaActualizacion", "fechaCreacion", "fechaVencimiento", "id", "monto", "orden") SELECT "deudaId", "fechaActualizacion", "fechaCreacion", "fechaVencimiento", "id", "monto", "orden" FROM "Cuota";
DROP TABLE "Cuota";
ALTER TABLE "new_Cuota" RENAME TO "Cuota";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
