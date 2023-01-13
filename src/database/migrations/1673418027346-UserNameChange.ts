import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNameChange1673418027346 implements MigrationInterface {
  name = 'UserNameChange1673418027346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(100)`);
    await queryRunner.query(``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(45)`);
  }
}
