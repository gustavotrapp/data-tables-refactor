import { sqliteTable, AnySQLiteColumn, text, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const tema = sqliteTable("tema", {
	id: text("id").primaryKey().notNull(),
	nome: text("nome").notNull(),
});

export const subtema = sqliteTable("subtema", {
	id: text("id").primaryKey().notNull(),
	nome: text("nome").notNull(),
	temaId: text("temaId").notNull().references(() => tema.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});