-- CreateTable
CREATE TABLE `Billing` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `paymentMethod` ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `status` ENUM('paid', 'unpaid', 'canceled') NOT NULL,
    `transactionalId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Billing_transactionalId_key`(`transactionalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
