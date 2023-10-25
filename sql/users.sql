CREATE TABLE Users(
    `id` BIGINT PRIMARY KEY DEFAULT(UUID_SHORT()),
    `name` VARCHAR(15) NOT NULL,
    `password` VARCHAR(15) NOT NULL,
    `created` DATETIME NOT NULL DEFAULT(CURRENT_TIMESTAMP)
)
