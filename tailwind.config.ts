export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f5f5",  // Soft gray background
        foreground: "#2d2d2d",  // Dark gray text for contrast

        primary: {
          DEFAULT: "#a78bfa",  // Light purple (soft and elegant)
          dark: "#7c3aed",     // Darker shade for hover states
          light: "#d8b4fe",    // Lighter shade for subtle highlights
        },

        secondary: {
          DEFAULT: "#f59e0b",  // Warm orange (for contrast and energy)
          dark: "#d97706",     // Darker shade for depth
          light: "#fde68a",    // Lighter shade for highlights
        },
      },
    },
  },
  plugins: [],
};
