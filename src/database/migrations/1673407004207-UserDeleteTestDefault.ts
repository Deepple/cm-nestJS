import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDeleteTestDefault1673407004207 implements MigrationInterface {
    name = 'UserDeleteTestDefault1673407004207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "test" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "test" SET DEFAULT '1'`);
    }

}
