import {MigrationInterface, QueryRunner} from "typeorm";

export class AddReferrerIdToUsers1592970590666 implements MigrationInterface {
    name = 'AddReferrerIdToUsers1592970590666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "referrer_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referrer_id"`);
    }

}
