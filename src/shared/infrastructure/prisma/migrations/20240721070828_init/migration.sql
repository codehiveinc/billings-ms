-- CreateTable
CREATE TABLE `billings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `order_uuid` VARCHAR(191) NOT NULL,
    `restaurant_uuid` VARCHAR(191) NOT NULL,
    `payment_method` ENUM('cash', 'transfer') NOT NULL,
    `status` ENUM('unpaid', 'paid') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` ENUM('usd', 'mxn') NOT NULL,
    `payment_receipt_url` LONGTEXT NULL,
    `transactional_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `billings_uuid_key`(`uuid`),
    UNIQUE INDEX `billings_transactional_id_key`(`transactional_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
