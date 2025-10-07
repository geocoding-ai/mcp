import type { Config } from 'prettier'

const config: Config = {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  bracketSameLine: false,
  singleAttributePerLine: true,
  parser: 'typescript',
  vueIndentScriptAndStyle: false,
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-organize-imports'],
  overrides: [
    {
      files: ['*.d.ts'],
      options: {
        printWidth: Infinity,
      },
    },
  ],
}

export default config
