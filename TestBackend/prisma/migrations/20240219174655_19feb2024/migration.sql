-- AlterTable
CREATE SEQUENCE discovery_source_id_seq;
ALTER TABLE "discovery_source" ALTER COLUMN "id" SET DEFAULT nextval('discovery_source_id_seq');
ALTER SEQUENCE discovery_source_id_seq OWNED BY "discovery_source"."id";
