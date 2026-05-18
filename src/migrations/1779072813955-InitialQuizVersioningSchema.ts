import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialQuizVersioningSchema1779072813955 implements MigrationInterface {
    name = 'InitialQuizVersioningSchema1779072813955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`question_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`questionVersionId\` int NOT NULL, \`optionText\` varchar(255) NOT NULL, \`optionOrder\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5001341ebb96c8cb46df45ffe8\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`quizId\` int NOT NULL, \`questionId\` int NOT NULL, \`questionVersionId\` int NOT NULL, \`questionOrder\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d51e7b1462e5c8df0759aa0b84\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`createdById\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_c08829f67d3a4e92056a69a1f6\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_attempts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`userId\` int NOT NULL, \`quizId\` int NOT NULL, \`attemptNumber\` int NOT NULL, \`submittedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_08244e7c9ab304266e6b4cca28\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attempt_answer_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`attemptAnswerId\` int NOT NULL, \`questionOptionId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8d23cdbff94229b2b43ed8508c\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attempt_answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`attemptId\` int NOT NULL, \`questionVersionId\` int NOT NULL, \`textAnswer\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cbfd5b7084020b42351f8400a4\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question_versions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`questionId\` int NOT NULL, \`versionNumber\` int NOT NULL, \`isLatest\` tinyint NOT NULL DEFAULT 1, \`questionText\` text NOT NULL, \`answerType\` enum ('RADIO', 'CHECKBOX', 'TEXT') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8000c759356795cc12d7f5addc\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdById\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_668f5eb70e40649990ab58f839\` (\`publicId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publicId\` varchar(36) NOT NULL, \`firstName\` varchar(100) NOT NULL, \`lastName\` varchar(100) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_9099c98f00a1b5aca6b8f7f04a\` (\`publicId\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`question_options\` ADD CONSTRAINT \`FK_9603921362dc02d60f7e779b6ea\` FOREIGN KEY (\`questionVersionId\`) REFERENCES \`question_versions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD CONSTRAINT \`FK_8889ccc5a40989ea308a588870e\` FOREIGN KEY (\`quizId\`) REFERENCES \`quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD CONSTRAINT \`FK_2deb89a4271b6f0e1aa30c2b07a\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` ADD CONSTRAINT \`FK_4933f0062841e15961b28cbb393\` FOREIGN KEY (\`questionVersionId\`) REFERENCES \`question_versions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz\` ADD CONSTRAINT \`FK_fc8816eda592f8df0f4c1786960\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD CONSTRAINT \`FK_ff7b1d71fabdc7e1f4aff552859\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` ADD CONSTRAINT \`FK_23f2bbe9288b221b1b377372782\` FOREIGN KEY (\`quizId\`) REFERENCES \`quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attempt_answer_options\` ADD CONSTRAINT \`FK_9e20baebec9eb95e0e2c967bc28\` FOREIGN KEY (\`attemptAnswerId\`) REFERENCES \`attempt_answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attempt_answer_options\` ADD CONSTRAINT \`FK_8a40691bc6ea890506e15103fc9\` FOREIGN KEY (\`questionOptionId\`) REFERENCES \`question_options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD CONSTRAINT \`FK_76e6a7dc4c1894250800077e79b\` FOREIGN KEY (\`attemptId\`) REFERENCES \`quiz_attempts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` ADD CONSTRAINT \`FK_c9d95a252926540d3239baba051\` FOREIGN KEY (\`questionVersionId\`) REFERENCES \`question_versions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_versions\` ADD CONSTRAINT \`FK_78bb84eef58e712e849d491290d\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_0483ccbf84f12cc70caff7b9075\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_0483ccbf84f12cc70caff7b9075\``);
        await queryRunner.query(`ALTER TABLE \`question_versions\` DROP FOREIGN KEY \`FK_78bb84eef58e712e849d491290d\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP FOREIGN KEY \`FK_c9d95a252926540d3239baba051\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answers\` DROP FOREIGN KEY \`FK_76e6a7dc4c1894250800077e79b\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answer_options\` DROP FOREIGN KEY \`FK_8a40691bc6ea890506e15103fc9\``);
        await queryRunner.query(`ALTER TABLE \`attempt_answer_options\` DROP FOREIGN KEY \`FK_9e20baebec9eb95e0e2c967bc28\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP FOREIGN KEY \`FK_23f2bbe9288b221b1b377372782\``);
        await queryRunner.query(`ALTER TABLE \`quiz_attempts\` DROP FOREIGN KEY \`FK_ff7b1d71fabdc7e1f4aff552859\``);
        await queryRunner.query(`ALTER TABLE \`quiz\` DROP FOREIGN KEY \`FK_fc8816eda592f8df0f4c1786960\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP FOREIGN KEY \`FK_4933f0062841e15961b28cbb393\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP FOREIGN KEY \`FK_2deb89a4271b6f0e1aa30c2b07a\``);
        await queryRunner.query(`ALTER TABLE \`quiz_questions\` DROP FOREIGN KEY \`FK_8889ccc5a40989ea308a588870e\``);
        await queryRunner.query(`ALTER TABLE \`question_options\` DROP FOREIGN KEY \`FK_9603921362dc02d60f7e779b6ea\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_9099c98f00a1b5aca6b8f7f04a\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_668f5eb70e40649990ab58f839\` ON \`questions\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP INDEX \`IDX_8000c759356795cc12d7f5addc\` ON \`question_versions\``);
        await queryRunner.query(`DROP TABLE \`question_versions\``);
        await queryRunner.query(`DROP INDEX \`IDX_cbfd5b7084020b42351f8400a4\` ON \`attempt_answers\``);
        await queryRunner.query(`DROP TABLE \`attempt_answers\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d23cdbff94229b2b43ed8508c\` ON \`attempt_answer_options\``);
        await queryRunner.query(`DROP TABLE \`attempt_answer_options\``);
        await queryRunner.query(`DROP INDEX \`IDX_08244e7c9ab304266e6b4cca28\` ON \`quiz_attempts\``);
        await queryRunner.query(`DROP TABLE \`quiz_attempts\``);
        await queryRunner.query(`DROP INDEX \`IDX_c08829f67d3a4e92056a69a1f6\` ON \`quiz\``);
        await queryRunner.query(`DROP TABLE \`quiz\``);
        await queryRunner.query(`DROP INDEX \`IDX_d51e7b1462e5c8df0759aa0b84\` ON \`quiz_questions\``);
        await queryRunner.query(`DROP TABLE \`quiz_questions\``);
        await queryRunner.query(`DROP INDEX \`IDX_5001341ebb96c8cb46df45ffe8\` ON \`question_options\``);
        await queryRunner.query(`DROP TABLE \`question_options\``);
    }

}
