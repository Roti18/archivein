import { db } from '$lib/server/db';
import { materiUpload } from '$lib/server/db/schema';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		const uploadsList = await db.select().from(materiUpload);

		return {
			uploadsList: uploadsList
		};
	} catch (error) {
		console.error('Gagal mengambil data materi upload:', error);

		return {
			uploadsList: [],
			error: "Gagal memuat data dari database. Pastikan 'local.db' sudah ada dan terisi."
		};
	}
}
