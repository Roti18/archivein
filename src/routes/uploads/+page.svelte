<script lang="ts">
	import type { PageData } from './$types';

	// Mengambil data dari load function
	export let data: PageData;

	// Fungsi untuk memformat tanggal
	function formatDate(dateString: string) {
		if (!dateString) return 'N/A';
		try {
			return new Date(dateString).toLocaleDateString('id-ID', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch (e) {
			return dateString;
		}
	}
</script>

<div class="p-4 sm:p-8 bg-gray-50 min-h-screen">
	<h1 class="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
		Daftar File Lampiran Materi
	</h1>

	{#if data.error}
		<div
			class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md"
			role="alert"
		>
			<p class="font-bold">Kesalahan Database</p>
			<p>{data.error}</p>
		</div>
	{:else if data.uploadsList.length === 0}
		<div
			class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md"
		>
			<p>
				Tidak ada file materi yang ditemukan. Tambahkan data dummy ke 'local.db' untuk melihat
				hasilnya!
			</p>
		</div>
	{:else}
		<div class="overflow-x-auto bg-white rounded-lg shadow-xl">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-100">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
						>
							ID
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
						>
							Materi ID
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
						>
							Nama File Asli
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
						>
							Tipe File
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
						>
							URL File
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
						>
							Waktu Upload
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each data.uploadsList as upload (upload.id)}
						<tr class="hover:bg-gray-50 transition-colors">
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
								>{upload.id}</td
							>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{upload.materiId}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold"
								>{upload.originalName}</td
							>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
								>{upload.type || 'N/A'}</td
							>
							<td class="px-6 py-4 whitespace-nowrap text-sm">
								<a
									href={upload.fileUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-500 hover:text-blue-700 underline truncate max-w-xs block"
								>
									{upload.fileUrl}
								</a>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{formatDate(upload.uploadedAt)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
