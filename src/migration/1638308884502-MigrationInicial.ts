import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationInicial1638308884502 implements MigrationInterface {
    name = 'MigrationInicial1638308884502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`hashSenha\` varchar(255) NOT NULL, \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`nome\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`viacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`quantidadeOnibus\` varchar(255) NOT NULL, \`cnpj\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_19201f08e7d0ed57aaa7ec9a0c\` (\`cnpj\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`viagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalVagas\` int NOT NULL, \`dataPartida\` datetime NOT NULL, \`origem\` varchar(255) NOT NULL, \`destino\` varchar(255) NOT NULL, \`ativo\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`viagem\``);
        await queryRunner.query(`DROP INDEX \`IDX_19201f08e7d0ed57aaa7ec9a0c\` ON \`viacao\``);
        await queryRunner.query(`DROP TABLE \`viacao\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
