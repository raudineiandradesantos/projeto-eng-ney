# SmartHVAC — Versão React + TypeScript

Esta pasta contém a versão modernizada do SmartHVAC, convertida de HTML/JS puro para **React 18 + TypeScript + Vite + TailwindCSS**.

## Estrutura

```
smarthvac-react/
├── index.html              # Entry point do Vite
├── package.json            # Dependências do projeto
├── vite.config.ts          # Configuração do Vite
├── tsconfig.json           # Configuração do TypeScript
├── tsconfig.node.json      # TS config para o Vite
├── tailwind.config.js      # Configuração do TailwindCSS
├── postcss.config.js       # Configuração do PostCSS
└── src/
    ├── main.tsx            # Entry point do React
    ├── App.tsx             # Componente principal
    ├── index.css           # CSS original do SmartHVAC (100% preservado)
    ├── htmlContent.ts      # HTML do body (gerado do original)
    └── appLogic.ts         # Lógica JS original encapsulada em TypeScript
```

## Como rodar localmente

```bash
cd smarthvac-react
npm install
npm run dev
```

## Como fazer build para produção

```bash
npm run build
```

## Tecnologias

| Antes (MVP) | Depois (Produção) |
|-------------|-------------------|
| HTML puro   | React 18 + JSX    |
| JavaScript  | TypeScript        |
| CSS inline  | TailwindCSS       |
| Sem bundler | Vite              |

## Nota sobre a migração

O visual e todas as funcionalidades são **100% idênticos** ao original.
A lógica JavaScript foi encapsulada no módulo `appLogic.ts` como uma função `initAppLogic()`,
chamada após o React montar o DOM via `useEffect`.

O CSS original foi preservado integralmente em `src/index.css`.
