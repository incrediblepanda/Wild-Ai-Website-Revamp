import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				surface: {
					raised: 'hsl(var(--surface-raised))',
					deep: 'hsl(var(--surface-deep))'
				},
				ember: {
					DEFAULT: 'hsl(var(--ember))',
					foreground: 'hsl(var(--ember-foreground))'
				},
				cta: {
					DEFAULT: 'hsl(var(--cta))',
					foreground: 'hsl(var(--cta-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				wildai: {
					dark: 'hsl(var(--wildai-teal))',
					neutral: 'hsl(var(--wildai-neutral))',
					mint: 'hsl(var(--wildai-mint))',
					teal: 'hsl(var(--wildai-teal))',
					charcoal: 'hsl(var(--wildai-charcoal))',
				}
			},
			fontFamily: {
				mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
				display: ['"Chakra Petch"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 4px)',
				sm: 'calc(var(--radius) - 7px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.45' },
				},
				'marquee': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' },
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(-45%)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'drift': {
					'0%, 100%': { transform: 'translate3d(0,0,0)' },
					'50%': { transform: 'translate3d(0,-10px,0)' },
				},
				'sheen': {
					'0%': { transform: 'translateX(-120%)' },
					'100%': { transform: 'translateX(220%)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'marquee': 'marquee 40s linear infinite',
				'drift': 'drift 7s ease-in-out infinite',
				'sheen': 'sheen 2.4s ease-in-out infinite',
			},
			boxShadow: {
				'signal': '0 24px 60px -32px hsl(187 40% 2% / 0.95)',
				'lift': '0 30px 70px -36px hsl(187 50% 2%)',
				'inset-line': 'inset 0 1px 0 0 hsl(var(--foreground) / 0.04)',
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
