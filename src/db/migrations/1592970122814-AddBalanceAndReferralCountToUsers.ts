import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBalanceAndReferralCountToUsers1592970122814 implements MigrationInterface {
    name = 'AddBalanceAndReferralCountToUsers1592970122814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "referral_count" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "users" ADD "balance" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referral_count"`);
    }

}
