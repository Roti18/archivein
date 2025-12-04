import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

class ThemeStore {
	current = $state<Theme>('light');

	constructor() {
		if (browser) {
			const savedTheme = localStorage.getItem('theme') as Theme;
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';

			this.current = savedTheme || systemTheme;
			this.apply();

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem('theme')) {
					this.current = e.matches ? 'dark' : 'light';
					this.apply();
				}
			});
		}
	}

	toggle() {
		this.current = this.current === 'light' ? 'dark' : 'light';
		this.save();
		this.apply();
	}

	set(theme: Theme) {
		this.current = theme;
		this.save();
		this.apply();
	}

	private save() {
		if (browser) {
			localStorage.setItem('theme', this.current);
		}
	}

	private apply() {
		if (browser) {
			const root = document.documentElement;
			if (this.current === 'dark') {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		}
	}
}

export const theme = new ThemeStore();
