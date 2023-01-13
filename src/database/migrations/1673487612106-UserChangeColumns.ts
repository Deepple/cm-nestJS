import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserChangeColumns1673487612106 implements MigrationInterface {
  name = 'UserChangeColumns1673487612106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "test" TO "status"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "createdTime" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" ADD "updatedTime" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(100)`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(20)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name"  TYPE character varying(100)`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedTime"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdTime"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "status" TO "test"`);
  }
}
