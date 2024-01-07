import { type Config } from "tailwindcss";


export default {
  content: ["./src/**/*.tsx"],
  theme: {  
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
