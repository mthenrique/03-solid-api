# Setup do projeto

- npm init -y
- npm i typescript @types/node tsx tsup -D
- npx tsc --init (cria o tsconfig.json)
- npm i fastify
- npm i dotenv
- npm i zod
- npm i eslint @rocketseat/eslint-config -D

## package.json

"scripts": {
"dev": "tsx watch src/server.ts",
"start": "node build/server.js",
"build": "tsup src --out-dir build"
},

## .npmrc

save-exact=true

## .eslintrc.json

{
"extends": [
"@rocketseat/eslint-config/node"
]
}
