import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/data/**/*.json",
  ],
  theme: {
    extend: {
      colors: {
        defaultButton: "#333333",
        status: {
          success: {
            default: "#32CD32",
            background: "#E6FFE6",
          },
          error: {
            default: "#FF1E1E",
            background: "#FFEBEF",
          },
        },
        option: {
          blue: "#2100A6",
          sky: "#B5E4FF",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }: any) {
      addComponents({
        ".el-primary": {
          borderWidth: "1px",
          "--tw-border-opacity": "1",
          borderColor: "rgb(0 0 0 / var(--tw-border-opacity))",
          borderRadius: "0.25rem",
          padding: "0.5rem",
        },
      });
    }),
  ],
};
export default config;
