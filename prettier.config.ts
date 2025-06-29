import type { Config } from 'prettier'

const config: Config = {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: false,
  singleQuote: true,
  singleAttributePerLine: true,
  parser: 'typescript',
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
