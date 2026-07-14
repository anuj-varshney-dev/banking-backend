-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "account_number" VARCHAR(20) NOT NULL,
    "balance" DECIMAL(12,2) DEFAULT 0,
    "user_id" INTEGER,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "from_account_id" INTEGER,
    "to_account_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_account_number_key" ON "accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
