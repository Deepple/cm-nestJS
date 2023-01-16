import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddtest1673406871823 implements MigrationInterface {
  name = 'UserAddtest1673406871823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "test" integer NOT NULL DEFAULT '1'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
  }
}
