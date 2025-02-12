-- CreateTable
CREATE TABLE "continent" (
    "code" VARCHAR(2) NOT NULL,
    "name" VARCHAR(15) NOT NULL,

    CONSTRAINT "continent_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "country" (
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(35) NOT NULL,
    "iso_2" VARCHAR(2) NOT NULL,
    "iso_3" VARCHAR(3) NOT NULL,
    "continent_code" VARCHAR(2) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "discipline" (
    "id" SERIAL NOT NULL,
    "sport_name" VARCHAR(35) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "coefficient" DECIMAL(5,2) NOT NULL,
    "coeff_men" DECIMAL(5,2),
    "coeff_women" DECIMAL(5,2),

    CONSTRAINT "discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sport" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(35) NOT NULL,
    "coeff" DECIMAL(6,2),

    CONSTRAINT "sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wfcr" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "country_code" VARCHAR(3) NOT NULL,
    "wrces" DECIMAL(5,2) NOT NULL,
    "merit" DECIMAL(5,2) NOT NULL,
    "wrces_points" DECIMAL(5,2) NOT NULL,
    "obesity" DECIMAL(5,2) NOT NULL,
    "pou" DECIMAL(5,2) NOT NULL,
    "avg_pou_obesity" DECIMAL(5,2) NOT NULL,
    "points" DECIMAL(5,2) NOT NULL,
    "change" INTEGER,

    CONSTRAINT "wfcr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wrces_final" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "country_code" VARCHAR(3) NOT NULL,
    "points" DECIMAL(10,0) NOT NULL,
    "change" INTEGER,

    CONSTRAINT "final_rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wrces_merit" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "country_code" VARCHAR(3) NOT NULL,
    "gdp_rank" INTEGER NOT NULL,
    "wrces_rank" INTEGER NOT NULL,
    "difference" INTEGER NOT NULL,
    "points" DECIMAL(5,2) NOT NULL,
    "final_points" DECIMAL(5,2) NOT NULL,
    "change" INTEGER,

    CONSTRAINT "wrces_merit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wrces_sport" (
    "id" SERIAL NOT NULL,
    "year" INTEGER,
    "sport_name" VARCHAR(35),
    "rank" INTEGER,
    "country_code" VARCHAR(3),
    "points" DECIMAL(20,0),
    "change" INTEGER,

    CONSTRAINT "sport_rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wspi" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "country_code" VARCHAR(3) NOT NULL,
    "wrces_points" DECIMAL(5,2) NOT NULL,
    "city_points" DECIMAL(5,2) NOT NULL,
    "proleague_points" DECIMAL(5,2) NOT NULL,
    "points" DECIMAL(5,2) NOT NULL,
    "change" INTEGER,

    CONSTRAINT "wspi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "is_published" BOOLEAN NOT NULL,
    "published_at" TIMESTAMP(6),

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whats_hot" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "is_published" BOOLEAN NOT NULL,
    "published_at" TIMESTAMP(6),

    CONSTRAINT "whats_hot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "is_employee" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discipline_name_key" ON "discipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sport_name_key" ON "sport"("name");

-- CreateIndex
CREATE UNIQUE INDEX "wfcr_year_country_code_key" ON "wfcr"("year", "country_code");

-- CreateIndex
CREATE UNIQUE INDEX "wrces_final_year_country_code_key" ON "wrces_final"("year", "country_code");

-- CreateIndex
CREATE UNIQUE INDEX "wrces_merit_year_country_code_key" ON "wrces_merit"("year", "country_code");

-- CreateIndex
CREATE UNIQUE INDEX "wrces_sport_year_country_code_sport_name_key" ON "wrces_sport"("year", "country_code", "sport_name");

-- CreateIndex
CREATE UNIQUE INDEX "wspi_year_country_code_key" ON "wspi"("year", "country_code");

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "country_continent_code_fkey" FOREIGN KEY ("continent_code") REFERENCES "continent"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wfcr" ADD CONSTRAINT "wfcr_country_fkey" FOREIGN KEY ("country_code") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wrces_final" ADD CONSTRAINT "final_rank_country_fkey" FOREIGN KEY ("country_code") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wrces_merit" ADD CONSTRAINT "wrces_merit_country_fkey" FOREIGN KEY ("country_code") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wrces_sport" ADD CONSTRAINT "sport_rank_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wspi" ADD CONSTRAINT "wspi_country_fkey" FOREIGN KEY ("country_code") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

