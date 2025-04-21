import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1745260759260 implements MigrationInterface {
    name = 'Version1745260759260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ecbe8ebc20a3c7cd594d8e445e1" UNIQUE ("name"), CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "isDone" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "categoryId" integer, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8f949d7a3a984759044054e89b8" UNIQUE ("name"), CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_entity_tags_tag_entity" ("taskEntityId" integer NOT NULL, "tagEntityId" integer NOT NULL, CONSTRAINT "PK_3b23f9f9ceed9133d1c62b42f38" PRIMARY KEY ("taskEntityId", "tagEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42e2285868866dbf9190de06d0" ON "task_entity_tags_tag_entity" ("taskEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9a0a56fc930eb5621ea2b7332f" ON "task_entity_tags_tag_entity" ("tagEntityId") `);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_2621bebd84d2624da37a34797fc" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_1b8b7afc7d6813e01d10d62fa5b" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity_tags_tag_entity" ADD CONSTRAINT "FK_42e2285868866dbf9190de06d0e" FOREIGN KEY ("taskEntityId") REFERENCES "task_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_entity_tags_tag_entity" ADD CONSTRAINT "FK_9a0a56fc930eb5621ea2b7332fa" FOREIGN KEY ("tagEntityId") REFERENCES "tag_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity_tags_tag_entity" DROP CONSTRAINT "FK_9a0a56fc930eb5621ea2b7332fa"`);
        await queryRunner.query(`ALTER TABLE "task_entity_tags_tag_entity" DROP CONSTRAINT "FK_42e2285868866dbf9190de06d0e"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_1b8b7afc7d6813e01d10d62fa5b"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_2621bebd84d2624da37a34797fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a0a56fc930eb5621ea2b7332f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42e2285868866dbf9190de06d0"`);
        await queryRunner.query(`DROP TABLE "task_entity_tags_tag_entity"`);
        await queryRunner.query(`DROP TABLE "tag_entity"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
