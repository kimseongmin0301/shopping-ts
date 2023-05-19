-- AlterTable
CREATE SEQUENCE media_seq_seq;
ALTER TABLE "Media" ALTER COLUMN "seq" SET DEFAULT nextval('media_seq_seq');
ALTER SEQUENCE media_seq_seq OWNED BY "Media"."seq";
