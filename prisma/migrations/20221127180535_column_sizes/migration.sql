-- AlterTable
ALTER TABLE `SubTaskModel` MODIFY `name` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `TaskModel` MODIFY `name` VARCHAR(200) NOT NULL,
    MODIFY `description` VARCHAR(500) NOT NULL;
