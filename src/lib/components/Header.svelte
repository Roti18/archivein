<script lang="ts">
	import { onMount } from 'svelte';

	let userMenuOpen = $state(false);

	onMount(() => {
		// Close dropdowns when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('#user-menu-button') && !target.closest('#user-dropdown')) {
				userMenuOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function toggleUserMenu(e: Event) {
		e.stopPropagation();
		userMenuOpen = !userMenuOpen;
	}
</script>

<nav class="bg-white/70 backdrop-blur-md w-full">
	<div class="flex items-center justify-between mx-auto px-6 py-3">
		<!-- Search Bar -->
		<div class="flex-1 max-w-xl">
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-5 h-5 text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-width="2"
							d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="search"
					class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
					placeholder="Search..."
				/>
			</div>
		</div>

		<!-- User Profile -->
		<div class="flex items-center ml-4">
			<button
				type="button"
				class="flex text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-200 transition-all"
				id="user-menu-button"
				aria-expanded={userMenuOpen}
				onclick={toggleUserMenu}
			>
				<span class="sr-only">Open user menu</span>
				<img
					class="w-9 h-9 rounded-full ring-2 ring-gray-100"
					src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
					alt="user photo"
				/>
			</button>

			<!-- Dropdown menu -->
			{#if userMenuOpen}
				<div
					class="absolute right-6 top-16 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-56"
					id="user-dropdown"
				>
					<div class="px-4 py-3 border-b border-gray-100">
						<span class="block text-sm font-semibold text-gray-900">Joseph McFall</span>
						<span class="block text-sm text-gray-500 truncate">name@flowbite.com</span>
					</div>
					<ul class="py-2 text-sm text-gray-700">
						<li>
							<a href="/" class="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-colors">
								<svg
									class="w-4 h-4 mr-3 text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
									/>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
									/>
								</svg>
								Dashboard
							</a>
						</li>
						<li>
							<a href="/" class="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-colors">
								<svg
									class="w-4 h-4 mr-3 text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
									/>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
									/>
								</svg>
								Settings
							</a>
						</li>
						<li>
							<a href="/" class="flex items-center px-4 py-2.5 hover:bg-gray-50 transition-colors">
								<svg
									class="w-4 h-4 mr-3 text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-width="2"
										d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
								</svg>
								Profile
							</a>
						</li>
					</ul>
					<div class="py-2 border-t border-gray-100">
						<a
							href="/"
							class="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
						>
							<svg
								class="w-4 h-4 mr-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
								/>
							</svg>
							Sign out
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>
