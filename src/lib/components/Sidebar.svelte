<script lang="ts">
	let menu = [
		{ name: 'Dashboard', href: '/' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Courses', href: '/courses' },
		{ name: 'Materi', href: '/materi' },
		{ name: 'Tags', href: '/tags' }
	];
</script>

<aside
	class="w-56 min-h-full bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4"
>
	<h2 class="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">Menu</h2>

	<ul class="space-y-2">
		{#each menu as item}
			<li>
				<a
					href={item.href}
					class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</aside>
