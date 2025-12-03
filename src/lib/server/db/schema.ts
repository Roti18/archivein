import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

// Helper function untuk kolom 'created_at' dan 'updated_at'
const timestamps = {
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
};

// =======================================================
// 1. course
// =======================================================
export const course = sqliteTable('course', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	code: text('code'),
	semester: integer('semester').notNull(),
	lecturer: text('lecturer'),
	createdAt: timestamps.createdAt
});

// =======================================================
// 2. project
// =======================================================
export const project = sqliteTable('project', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	courseId: integer('course_id')
		.notNull()
		.references(() => course.id, { onDelete: 'cascade' }), // FOREIGN KEY
	title: text('title').notNull(),
	description: text('description'),
	visibility: text('visibility').default('public'), // 'public' | 'private'
	status: text('status').default('draft'), // 'draft' | 'submitted' | 'approved'
	createdAt: timestamps.createdAt,
	updatedAt: timestamps.updatedAt
});

// =======================================================
// 3. upload (File yang diunggah untuk Project)
// =======================================================
export const upload = sqliteTable('upload', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id')
		.notNull()
		.references(() => project.id, { onDelete: 'cascade' }), // FOREIGN KEY
	fileUrl: text('file_url').notNull(),
	type: text('type'), // Misalnya: 'image', 'document', 'video'
	size: integer('size'),
	mimeType: text('mime_type'),
	originalName: text('original_name'),
	isPrimary: integer('is_primary', { mode: 'boolean' }).default(false), // 1 atau 0 (true/false)
	uploadedAt: timestamps.createdAt
});

// =======================================================
// 4. tag
// =======================================================
export const tag = sqliteTable('tag', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull()
});

// =======================================================
// 5. project_tag (Tabel Many-to-Many)
// =======================================================
export const projectTag = sqliteTable(
	'project_tag',
	{
		projectId: integer('project_id')
			.notNull()
			.references(() => project.id, { onDelete: 'cascade' }), // FOREIGN KEY
		tagId: integer('tag_id')
			.notNull()
			.references(() => tag.id, { onDelete: 'cascade' }) // FOREIGN KEY
	},
	(t) => ({
		// Kunci Primer Gabungan (Composite Primary Key)
		pk: primaryKey({ columns: [t.projectId, t.tagId] })
	})
);

// =======================================================
// 6. category
// =======================================================
export const category = sqliteTable('category', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull()
});

// =======================================================
// 7. project_category (Tabel Many-to-Many)
// =======================================================
export const projectCategory = sqliteTable(
	'project_category',
	{
		projectId: integer('project_id')
			.notNull()
			.references(() => project.id, { onDelete: 'cascade' }), // FOREIGN KEY
		categoryId: integer('category_id')
			.notNull()
			.references(() => category.id, { onDelete: 'cascade' }) // FOREIGN KEY
	},
	(t) => ({
		// Kunci Primer Gabungan (Composite Primary Key)
		pk: primaryKey({ columns: [t.projectId, t.categoryId] })
	})
);

// =======================================================
// 8. materi
// =======================================================
export const materi = sqliteTable('materi', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	courseId: integer('course_id')
		.notNull()
		.references(() => course.id, { onDelete: 'cascade' }), // FOREIGN KEY
	title: text('title').notNull(),
	description: text('description'),
	type: text('type'), // Misalnya: 'video', 'pdf', 'slide'
	fileUrl: text('file_url').notNull(),
	week: integer('week'),
	uploadedAt: timestamps.createdAt
});

// =======================================================
// 9. materi_upload (File yang diunggah sebagai lampiran Materi)
// =======================================================
export const materiUpload = sqliteTable('materi_upload', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	materiId: integer('materi_id')
		.notNull()
		.references(() => materi.id, { onDelete: 'cascade' }), // FOREIGN KEY
	fileUrl: text('file_url').notNull(),
	type: text('type'), // Misalnya: 'image', 'document'
	originalName: text('original_name'),
	uploadedAt: timestamps.createdAt
});
