/*
  Warnings:

  - The values [paid,unpaid,canceled] on the enum `Billing_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Billing` MODIFY `status` ENUM('pagado', 'pendiente', 'cancelado') NOT NULL;
