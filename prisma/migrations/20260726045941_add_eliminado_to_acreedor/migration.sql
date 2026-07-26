-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Acreedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "comentarios" TEXT NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Acreedor" ("comentarios", "fechaActualizacion", "fechaCreacion", "id", "nombre", "telefono") SELECT "comentarios", "fechaActualizacion", "fechaCreacion", "id", "nombre", "telefono" FROM "Acreedor";
DROP TABLE "Acreedor";
ALTER TABLE "new_Acreedor" RENAME TO "Acreedor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
