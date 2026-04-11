-- CreateTable
CREATE TABLE "CustomerProfile" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "website" TEXT,
    "fsvpCompliant" BOOLEAN NOT NULL DEFAULT false,
    "prefersDDP" BOOLEAN NOT NULL DEFAULT true,
    "avgPaymentTerms" INTEGER NOT NULL DEFAULT 30,
    "leadScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProfile_email_key" ON "CustomerProfile"("email");
