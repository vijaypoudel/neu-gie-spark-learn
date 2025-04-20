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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
        // NeuGie custom colors
        'neugie-blue': '#FB923C',
        'neugie-yellow': '#000000',
        'neugie-green': '#FB923C',
        'neugie-red': '#FB923C',
        'neugie-purple': '#000000',
        'neugie-orange': '#FB923C',
        'neugie-light-blue': '#FFF7ED',
        'neugie-light-yellow': '#F5F5F5',
        'neugie-light-green': '#FFF7ED',
        'neugie-light-red': '#FFF7ED',
        'neugie-light-purple': '#F5F5F5',
        'neugie-light-orange': '#FFF7ED',
      },
      backgroundColor: {
        background: 'hsl(var(--background) / <alpha-value>)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        'wave': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '10%': {
            transform: 'rotate(14deg)'
          },
          '20%': {
            transform: 'rotate(-8deg)'
          },
          '30%': {
            transform: 'rotate(14deg)'
          },
          '40%': {
            transform: 'rotate(-4deg)'
          },
          '50%': {
            transform: 'rotate(10deg)'
          },
          '60%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'wave': 'wave 2.5s ease-in-out infinite',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 15px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -12px rgba(0, 0, 0, 0.08)',
        'premium-elevated': '0 25px 50px -15px rgba(0, 0, 0, 0.15), 0 15px 35px -12px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        premium: {
          background: 'hsl(var(--premium-background))',
          text: 'hsl(var(--premium-text))',
          accent: 'hsl(var(--premium-accent))',
          highlight: 'hsl(var(--premium-highlight))',
        }
      },
      textColor: {
        foreground: 'hsl(var(--foreground) / <alpha-value>)'
      },
      borderColor: {
        'neugie-blue': 'hsl(var(--neugie-blue) / <alpha-value>)'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
