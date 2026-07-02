-- CreateTable
CREATE TABLE "Deuda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "montoTotal" DECIMAL NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    "acreedorId" INTEGER NOT NULL,
    CONSTRAINT "Deuda_acreedorId_fkey" FOREIGN KEY ("acreedorId") REFERENCES "Acreedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cuota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orden" INTEGER NOT NULL,
    "monto" DECIMAL NOT NULL,
    "fechaVencimiento" DATETIME,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    "deudaId" INTEGER,
    CONSTRAINT "Cuota_deudaId_fkey" FOREIGN KEY ("deudaId") REFERENCES "Deuda" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Acreedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL
);
