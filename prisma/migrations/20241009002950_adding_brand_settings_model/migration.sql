-- CreateTable
CREATE TABLE "BrandSettings" (
    "id" TEXT NOT NULL,
    "logo_header" TEXT NOT NULL,
    "logo_footer" TEXT NOT NULL,
    "primary_color" TEXT,
    "secondary_color" TEXT,
    "accent_color" TEXT,

    CONSTRAINT "BrandSettings_pkey" PRIMARY KEY ("id")
);
