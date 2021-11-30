import {MigrationInterface, QueryRunner} from "typeorm";

export class CriacaoOnibus1638309859701 implements MigrationInterface {
    name = 'CriacaoOnibus1638309859701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`onibus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`marca\` varchar(255) NOT NULL, \`ano\` int NOT NULL, \`numeroAssentos\` int NOT NULL, \`placa\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`onibus\``);
    }

}
