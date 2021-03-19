import {MigrationInterface, QueryRunner} from "typeorm";

export class Photo1616162176307 implements MigrationInterface {
    name = 'Photo1616162176307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo_metadata" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "height" integer NOT NULL, "comment" varchar NOT NULL, "photoId" integer, CONSTRAINT "REL_99f01ed52303cc16139d69f746" UNIQUE ("photoId"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "description" text NOT NULL, "filename" varchar NOT NULL, "views" double NOT NULL, "isPublished" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_photo_metadata" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "height" integer NOT NULL, "comment" varchar NOT NULL, "photoId" integer, CONSTRAINT "REL_99f01ed52303cc16139d69f746" UNIQUE ("photoId"), CONSTRAINT "FK_99f01ed52303cc16139d69f7464" FOREIGN KEY ("photoId") REFERENCES "photo" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_photo_metadata"("id", "height", "comment", "photoId") SELECT "id", "height", "comment", "photoId" FROM "photo_metadata"`);
        await queryRunner.query(`DROP TABLE "photo_metadata"`);
        await queryRunner.query(`ALTER TABLE "temporary_photo_metadata" RENAME TO "photo_metadata"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo_metadata" RENAME TO "temporary_photo_metadata"`);
        await queryRunner.query(`CREATE TABLE "photo_metadata" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "height" integer NOT NULL, "comment" varchar NOT NULL, "photoId" integer, CONSTRAINT "REL_99f01ed52303cc16139d69f746" UNIQUE ("photoId"))`);
        await queryRunner.query(`INSERT INTO "photo_metadata"("id", "height", "comment", "photoId") SELECT "id", "height", "comment", "photoId" FROM "temporary_photo_metadata"`);
        await queryRunner.query(`DROP TABLE "temporary_photo_metadata"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "photo_metadata"`);
    }

}
