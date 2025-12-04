<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();

	let sidebarOpen = $state(true);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen w-full bg-gray-50">
	<Sidebar bind:isOpen={sidebarOpen} />

	<div
		class="flex flex-col flex-1 transition-all duration-300 {sidebarOpen ? 'sm:ml-64' : 'sm:ml-20'}"
	>
		<div
			class="fixed top-0 right-0 z-30 transition-all duration-300 {sidebarOpen
				? 'left-0 sm:left-64'
				: 'left-0 sm:left-20'}"
		>
			<Header />
		</div>

		<main class="mt-16 flex-1 overflow-y-auto p-6">
			{@render children()}
		</main>
	</div>
</div>
