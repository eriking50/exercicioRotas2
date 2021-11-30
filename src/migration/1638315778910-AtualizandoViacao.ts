import {MigrationInterface, QueryRunner} from "typeorm";

export class AtualizandoViacao1638315778910 implements MigrationInterface {
    name = 'AtualizandoViacao1638315778910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`viacao\` DROP COLUMN \`quantidadeOnibus\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`viacao\` ADD \`quantidadeOnibus\` varchar(255) NOT NULL`);
    }

}
