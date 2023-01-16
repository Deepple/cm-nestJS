import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1673404651588 implements MigrationInterface {
  name = 'CreateUser1673404651588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(45) NOT NULL, "nickname" character varying, "password" character varying NOT NULL, "name" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
