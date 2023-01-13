import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddPhotoTable1673489390085 implements MigrationInterface {
  name = 'UserAddPhotoTable1673489390085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "user_photo" ("id" SERIAL NOT NULL, "url" character varying(100) NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_2863d588f4efce8bf42c9c63526" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_photo" ADD CONSTRAINT "FK_371668dfabe4574c8efde523898" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_photo" DROP CONSTRAINT "FK_371668dfabe4574c8efde523898"`);
    await queryRunner.query(`DROP TABLE "user_photo"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);
  }
}
