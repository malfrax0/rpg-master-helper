/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  compilerOptions: {
    target: "ESNext",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: false,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    module: "esnext",
    moduleResolution: "node",
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    noFallthroughCasesInSwitch: true,
    jsx: "react-jsx",
    types: ["vite/client", "vite-plugin-svgr/client"]
  },
  include: ["src"]
}