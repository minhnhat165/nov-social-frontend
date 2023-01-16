/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				tablet: '898px',
				laptop: '1099px',
				desktop: '1280px',
			},
			animation: {
				'spin-fast': 'spin 0.75s linear infinite',
				drop: 'drop 0.5s ease-in-out',
			},
			width: {
				lg: '64rem',
				md: '48rem',
				sm: '32rem',
				xs: '24rem',
			},
			height: {
				lg: '64rem',
				md: '48rem',
				sm: '32rem',
				xs: '24rem',
			},
			colors: {
				'text-bold': 'rgb(var(--text-color-bold) / <alpha-value>)',
				'text-color-primary': 'rgb(var(--text-color) / <alpha-value>)',
				primary: {
					50: '#e2f6ff',
					100: '#b5e7ff',
					200: '#84d7ff',
					300: '#54c7fd',
					400: '#32bafd',
					500: '#1daefc',
					600: '#1c9fec',
					700: '#1a8cd8',
					800: '#187bc4',
					900: '#145ba2',
				},
				dark: {
					bold: 'rgb(21, 26, 35)',
					bold2: 'rgb(21, 26, 35)',
					semiBold: 'rgb(26, 33, 44)',
					regular: 'rgb(32, 40, 54)',
					light: 'rgb(40, 49, 67)',
					'very-light': 'rgb(47, 59, 80)',
					border: 'rgb(59, 73, 99)',

					//text dark
					'text-bold': '#e7e9ed',
					'text-regular': 'rgb(162, 165, 185)',
					'text-light': 'rgb(117, 122, 145)',
					50: '#e9ecf5',
					100: '#c8d0dd',
					200: '#a7b1c1',
					300: '#8692a7',
					400: '#6e7c93',
					500: '#576680',
					600: '#4a5970',
					700: '#3a465a',
					800: '#2b3445',
					900: '#19212e',
				},
				light: {
					50: '#ffffff',
					100: '#fafafa',
					200: '#f5f5f5',
					300: '#f0f0f0',
					400: '#dedede',
					500: '#c2c2c2',
					600: '#979797',
					700: '#818181',
					800: '#606060',
					900: '#3c3c3c',
					'text-bold': '#4a4b67',
					'text-semiBold': '#757a91',
					'text-regular': '#787d93',
					'text-light': '#888da8',
				},
			},
			keyframes: {
				drop: {
					'0%, 100%': { width: '40px' },
					'50%': { width: '20px' },
				},
			},
			boxShadow: {
				'3xl': '0 12px 28px 0 rgb(0,0,0,0.2), 0 2px 4px 0 rgb(0,0,0,0.1)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
	darkMode: 'class',
};
