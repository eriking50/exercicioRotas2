import {MigrationInterface, QueryRunner} from "typeorm";

export class CriacaoRelações1638311912425 implements MigrationInterface {
    name = 'CriacaoRelações1638311912425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario_viagens_viagem\` (\`usuarioId\` int NOT NULL, \`viagemId\` int NOT NULL, INDEX \`IDX_188825677924d5b5de99864128\` (\`usuarioId\`), INDEX \`IDX_e5ab1fcc475ea82b1f433a886a\` (\`viagemId\`), PRIMARY KEY (\`usuarioId\`, \`viagemId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`viagem\` ADD \`viacaoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`viagem\` ADD \`onibusId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`viacaoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`onibus\` ADD \`status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`onibus\` ADD \`viacaoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`viagem\` ADD CONSTRAINT \`FK_fff8f28b66469a7542898d4bf2e\` FOREIGN KEY (\`viacaoId\`) REFERENCES \`viacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`viagem\` ADD CONSTRAINT \`FK_9a25dba63642612aef5b61bbf5e\` FOREIGN KEY (\`onibusId\`) REFERENCES \`onibus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_c0bfc314bcebb3b1a4dcc04a0c9\` FOREIGN KEY (\`viacaoId\`) REFERENCES \`viacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`onibus\` ADD CONSTRAINT \`FK_b19f30ff3f591282fb57fe71537\` FOREIGN KEY (\`viacaoId\`) REFERENCES \`viacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario_viagens_viagem\` ADD CONSTRAINT \`FK_188825677924d5b5de998641282\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`usuario_viagens_viagem\` ADD CONSTRAINT \`FK_e5ab1fcc475ea82b1f433a886ab\` FOREIGN KEY (\`viagemId\`) REFERENCES \`viagem\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario_viagens_viagem\` DROP FOREIGN KEY \`FK_e5ab1fcc475ea82b1f433a886ab\``);
        await queryRunner.query(`ALTER TABLE \`usuario_viagens_viagem\` DROP FOREIGN KEY \`FK_188825677924d5b5de998641282\``);
        await queryRunner.query(`ALTER TABLE \`onibus\` DROP FOREIGN KEY \`FK_b19f30ff3f591282fb57fe71537\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_c0bfc314bcebb3b1a4dcc04a0c9\``);
        await queryRunner.query(`ALTER TABLE \`viagem\` DROP FOREIGN KEY \`FK_9a25dba63642612aef5b61bbf5e\``);
        await queryRunner.query(`ALTER TABLE \`viagem\` DROP FOREIGN KEY \`FK_fff8f28b66469a7542898d4bf2e\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP INDEX \`IDX_2863682842e688ca198eb25c12\``);
        await queryRunner.query(`ALTER TABLE \`onibus\` DROP COLUMN \`viacaoId\``);
        await queryRunner.query(`ALTER TABLE \`onibus\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`viacaoId\``);
        await queryRunner.query(`ALTER TABLE \`viagem\` DROP COLUMN \`onibusId\``);
        await queryRunner.query(`ALTER TABLE \`viagem\` DROP COLUMN \`viacaoId\``);
        await queryRunner.query(`DROP INDEX \`IDX_e5ab1fcc475ea82b1f433a886a\` ON \`usuario_viagens_viagem\``);
        await queryRunner.query(`DROP INDEX \`IDX_188825677924d5b5de99864128\` ON \`usuario_viagens_viagem\``);
        await queryRunner.query(`DROP TABLE \`usuario_viagens_viagem\``);
    }

}
