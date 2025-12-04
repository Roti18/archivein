<script lang="ts">
	import { onMount } from 'svelte';

	let { isOpen = $bindable(true) } = $props();

	let mobileOpen = $state(false);
	let ecommerceOpen = $state(false);

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (
				mobileOpen &&
				!target.closest('#sidebar-multi-level-sidebar') &&
				!target.closest('[data-drawer-toggle]')
			) {
				mobileOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function toggleMobileSidebar(e: Event) {
		e.stopPropagation();
		mobileOpen = !mobileOpen;
	}

	function toggleDesktopSidebar() {
		isOpen = !isOpen;
	}

	function toggleEcommerce() {
		ecommerceOpen = !ecommerceOpen;
	}
</script>

<!-- Mobile Toggle Button - Fixed Position -->
<button
	type="button"
	data-drawer-toggle="sidebar-multi-level-sidebar"
	class="fixed top-4 left-4 z-50 text-heading bg-white box-border border border-default hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none inline-flex sm:hidden shadow-md"
	onclick={toggleMobileSidebar}
>
	<span class="sr-only">Open sidebar</span>
	<svg
		class="w-6 h-6"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-width="2"
			d="M5 7h14M5 12h14M5 17h10"
		/>
	</svg>
</button>

{#if mobileOpen}
	<div
		class="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
		onclick={() => (mobileOpen = false)}
	></div>
{/if}

<!-- Sidebar -->
<aside
	id="sidebar-multi-level-sidebar"
	class="fixed top-0 left-0 z-40 h-screen transition-all duration-300 {mobileOpen
		? 'translate-x-0'
		: '-translate-x-full'} sm:translate-x-0 {isOpen ? 'w-64' : 'w-20'}"
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
		<!-- Desktop Toggle Button -->
		<button
			type="button"
			class="hidden sm:flex items-center justify-center w-full mb-4 px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand"
			onclick={toggleDesktopSidebar}
			title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
		>
			<svg
				class="w-5 h-5 transition-transform {isOpen ? '' : 'rotate-180'}"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 12h14M5 12l4-4m-4 4 4 4"
				/>
			</svg>
			{#if isOpen}
				<span class="ms-2">Collapse</span>
			{/if}
		</button>

		<ul class="space-y-2 font-medium">
			<li>
				<a
					href="/"
					class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
					title="Dashboard"
				>
					<svg
						class="w-5 h-5 transition duration-75 group-hover:text-fg-brand shrink-0"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
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
					{#if isOpen}
						<span class="ms-3">Dashboard</span>
					{/if}
				</a>
			</li>

			<li>
				<button
					type="button"
					class="flex items-center w-full justify-between px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
					onclick={toggleEcommerce}
					title="E-commerce"
				>
					<div class="flex items-center">
						<svg
							class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
							/>
						</svg>
						{#if isOpen}
							<span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
						{/if}
					</div>
					{#if isOpen}
						<svg
							class="w-5 h-5 transition-transform {ecommerceOpen ? 'rotate-180' : ''}"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 9-7 7-7-7"
							/>
						</svg>
					{/if}
				</button>

				{#if ecommerceOpen && isOpen}
					<ul class="py-2 space-y-2">
						<li>
							<a
								href="/"
								class="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
								>Products</a
							>
						</li>
						<li>
							<a
								href="/"
								class="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
								>Billing</a
							>
						</li>
						<li>
							<a
								href="/"
								class="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
								>Invoice</a
							>
						</li>
					</ul>
				{/if}
			</li>

			<li>
				<a
					href="/"
					class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
					title="Kanban"
				>
					<svg
						class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
						/>
					</svg>
					{#if isOpen}
						<span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
						<span
							class="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded-sm"
							>Pro</span
						>
					{/if}
				</a>
			</li>

			<li>
				<a
					href="/"
					class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group relative"
					title="Inbox"
				>
					<svg
						class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"
						/>
					</svg>
					{#if isOpen}
						<span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
						<span
							class="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full"
							>2</span
						>
					{:else}
						<span
							class="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full"
							>2</span
						>
					{/if}
				</a>
			</li>

			<li>
				<a
					href="/"
					class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
					title="Users"
				>
					<svg
						class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
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
					{#if isOpen}
						<span class="flex-1 ms-3 whitespace-nowrap">Users</span>
					{/if}
				</a>
			</li>

			<li>
				<a
					href="/"
					class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
					title="Products"
				>
					<svg
						class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
						/>
					</svg>
					{#if isOpen}
						<span class="flex-1 ms-3 whitespace-nowrap">Products</span>
					{/if}
				</a>
			</li>

			<li>
				<a
					href="/"
					class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
					title="Sign In"
				>
					<svg
						class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
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
					{#if isOpen}
						<span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
					{/if}
				</a>
			</li>
		</ul>
	</div>
</aside>
