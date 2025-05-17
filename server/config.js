import dotenv from "dotenv";

dotenv.config();

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_CLUSTER = process.env.DB_CLUSTER;
export const DB_NAME = process.env.DB_NAME;
export const Port = process.env.Port;
export const DB_APP_NAME = process.env.DB_APP_NAME;
