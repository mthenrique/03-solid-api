import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/modules/**/infra/http/**', 'prisma']],
    dir: './tests',
    coverage: {
      reporter: ['text', 'json', 'html'], // Formatos de saída da cobertura
      include: ['src/**/*.ts', 'src/**/*.tsx'], // Arquivos que você deseja incluir
      exclude: [
        'src/database/**/*', // Exclude Database files
        'src/http/**/*', // Exclude HTTP files
        'src/**/*.test.ts', // Exclude Test files
        'src/**/*.d.ts', // Exclude TypeScript definitions
        'src/**/*-dto.ts', // Exclude DTO files
        'src/**/*-factory.ts', // Exclude factory files
      ],
      // Você pode adicionar mais opções conforme necessário
    },
  },
})
