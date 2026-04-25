export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'shooting-star': 'shooting-star 3s ease-out infinite',
        'float': 'float 20s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },

      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        'shooting-star': {
          '0%': { 
            transform: 'rotate(-45deg) translateX(0) translateY(0)',
            opacity: '1' 
          },
          '70%': { opacity: '1' },
          '100%': { 
            transform: 'rotate(-45deg) translateX(1000px) translateY(1000px)',
            opacity: '0' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)' 
          },
          '50%': { 
            opacity: '0.7',
            boxShadow: '0 0 40px rgba(102, 126, 234, 0.8)' 
          },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 0deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
