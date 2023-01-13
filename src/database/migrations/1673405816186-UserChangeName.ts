import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserChangeName1673405816186 implements MigrationInterface {
  name = 'UserChangeName1673405816186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(45)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying`);
  }
}
