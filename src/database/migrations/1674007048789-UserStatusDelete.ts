import { MigrationInterface, QueryRunner } from "typeorm";

export class UserStatusDelete1674007048789 implements MigrationInterface {
    name = 'UserStatusDelete1674007048789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdTime" TYPE TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdTime" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" integer NOT NULL`);
    }

}
