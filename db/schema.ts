import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const records = sqliteTable('records', { id: text('id').primaryKey(), kind: text('kind').notNull(), body: text('body').notNull(), created: integer('created').notNull() });
export const messages = sqliteTable('messages', { id: text('id').primaryKey(), room: text('room').notNull(), name: text('name').notNull(), body: text('body').notNull(), created: integer('created').notNull() });
export const sessions = sqliteTable('sessions', { id: text('id').primaryKey(), expires: integer('expires').notNull() });
export const limits = sqliteTable('limits', { id: text('id').primaryKey(), count: integer('count').notNull(), expires: integer('expires').notNull() });
