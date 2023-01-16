import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserChangeColumns1673487612106 implements MigrationInterface {
  name = 'UserChangeColumns1673487612106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "test" TO "status"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdTime" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedTime" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying(100)`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" TYPE character varying(20)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name"  TYPE character varying(100)`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedTime"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdTime"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "status" TO "test"`);
  }
}
