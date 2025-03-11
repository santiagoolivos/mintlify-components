/** @type {import('tailwindcss').Config} */
// const svgToDataUri = require('mini-svg-data-uri');
// const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

export default {
  darkMode: 'class', // If you want the same "dark" approach as Mintlify
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3', 'sm:grid-cols-4'],
  theme: {
    // The correct key is "extend", not "xtend"
    extend: {
      colors: {
        codeblock: '#161b22',
        'codeblock-tabs': '#21262d',
        'dark-input': '#30363d',
				"main-background": "#f1f5f9", // slate-100, used for the main window background
				blackish: {
					// To use in most all texts: text-blackish
					light: "#334155", // slate-700
					DEFAULT: "#0f172a", // slate-900
				},
				primary: {
					// when used in backgrounds (eg buttons) use hover:text-primary-light
					// when used in texts (eg links) use hover:text-primary-dark
					light: "#3b82f6", // blue-500
					DEFAULT: "#2563eb", // blue-600
					dark: "#1d4ed8", // blue-700
				},
				danger: {
					// when used in backgrounds (eg buttons) use hover:text-danger-light
					light: "#ef4444", // red-500
					DEFAULT: "#dc2626", // red-600
					dark: "#b91c1c", // red-700
				},
				success: {
					// when used in backgrounds (eg buttons) use hover:text-success-light
					light: "#22c55e", // green-500
					DEFAULT: "#16a34a", // green-600
					dark: "#15803d", // green-700
				},
				secondary: {
					// when used in backgrounds (eg buttons) use hover:text-secondary-light
					DEFAULT: "#f9fafb", // gray-50
				},
        tooltip:{
          DEFAULT: "#1a202c", // slate-800
        }
			},
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.slate.700'),
            hr: {
              borderColor: theme('colors.slate.100'),
              marginTop: '3em',
              marginBottom: '3em',
            },
            'h1, h2, h3': {
              letterSpacing: '-0.025em',
            },
            h2: {
              marginBottom: `${16 / 24}em`,
            },
            h3: {
              marginTop: '2.4em',
              lineHeight: '1.4',
            },
            h4: {
              marginTop: '2em',
              fontSize: '1.125em',
            },
            'h1 small, h2 small, h3 small, h4 small': {
              fontFamily: theme('fontFamily.mono').join(', '),
              color: theme('colors.slate.500'),
              fontWeight: 500,
            },
            'h2 small': {
              fontSize: theme('fontSize.lg')[0],
              ...theme('fontSize.lg')[1],
            },
            'h3 small': {
              fontSize: theme('fontSize.base')[0],
              ...theme('fontSize.base')[1],
            },
            'h4 small': {
              fontSize: theme('fontSize.sm')[0],
              ...theme('fontSize.sm')[1],
            },
            'h1, h2, h3, h4': {
              'scroll-margin-top': 'var(--scroll-mt)',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: 0,
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75em',
            },
            'ul > li::before': {
              content: '""',
              width: '0.75em',
              height: '0.125em',
              position: 'absolute',
              top: 'calc(0.875em - 0.0625em)',
              left: 0,
              borderRadius: '999px',
              backgroundColor: theme('colors.slate.300'),
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'none',
            },
            'a:hover': {
              borderBottomWidth: '2px',
            },
            'a code': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
            strong: {
              color: theme('colors.slate.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            'a strong': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
            kbd: {
              background: theme('colors.slate.100'),
              borderWidth: '1px',
              borderColor: theme('colors.slate.200'),
              padding: '0.125em 0.25em',
              color: theme('colors.slate.700'),
              fontWeight: 500,
              fontSize: '0.875em',
              fontVariantLigatures: 'none',
              borderRadius: '4px',
              margin: '0 1px',
            },
            code: {
              fontWeight: theme('fontWeight.medium'),
              fontVariantLigatures: 'none',
            },
            pre: {
              color: theme('colors.slate.50'),
              borderRadius: theme('borderRadius.xl'),
              padding: theme('padding.5'),
              boxShadow: theme('boxShadow.md'),
              display: 'flex',
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`,
            },
            'p + pre': {
              marginTop: `${-4 / 14}em`,
            },
            'pre + pre': {
              marginTop: `${-16 / 14}em`,
            },
            'pre code': {
              flex: 'none',
              minWidth: '100%',
            },
            table: {
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight,
            },
            thead: {
              color: theme('colors.slate.700'),
              borderBottomColor: theme('colors.slate.200'),
            },
            'thead th': {
              paddingTop: 0,
              fontWeight: theme('fontWeight.semibold'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.slate.100'),
            },
            'tbody tr:last-child': {
              borderBottomWidth: '1px',
            },
            'tbody code': {
              fontSize: theme('fontSize.xs')[0],
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.400'),
            'h1, h2, h3, h4, thead th': {
              color: theme('colors.slate.200'),
            },
            'h1 small, h2 small, h3 small, h4 small': {
              color: theme('colors.slate.400'),
            },
            kbd: {
              background: theme('colors.slate.700'),
              borderColor: theme('colors.slate.600'),
              color: theme('colors.slate.200'),
            },
            code: {
              color: theme('colors.slate.200'),
            },
            hr: {
              borderColor: theme('colors.slate.200'),
              opacity: '0.05',
            },
            pre: {
              boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)',
            },
            a: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.slate.200'),
            },
            thead: {
              color: theme('colors.slate.300'),
              borderBottomColor: 'rgb(148 163 184 / 0.2)',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(148 163 184 / 0.1)',
            },
          },
        },
      }),
      // If needed, you can re-add custom spacing, etc.
      // spacing: {
      //   18: '4.5rem',
      //   full: '100%',
      // },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-children'),
    // If you still want the svgToDataUri utilities, 
    // uncomment and use them similarly to the original snippet
  ],
};
