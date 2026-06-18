# SmartHVAC — Projeto de Engenharia

Repositório principal do projeto **SmartHVAC**, sistema de controle e monitoramento de equipamentos HVAC (Aquecimento, Ventilação e Ar-Condicionado).

## Estrutura do Repositório

```
projeto-eng-ney/
├── app-mobile/          # Frente Mobile (HTML + Capacitor → APK Android)
│   ├── dashboard.html
│   ├── smarthvac-main.html
│   ├── area_adm.html
│   ├── relatorio-obra.html
│   ├── relatorio-obra-v2.html
│   ├── firebase-config.js
│   ├── capacitor.config.json
│   └── package.json
│
├── rn-app/              # Frente Mobile (React Native — versão alternativa)
│   ├── android/
│   └── src/
│
├── smarthvac-react/     # Frente Web (React + TypeScript + Vite + TailwindCSS)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── .github/workflows/   # CI/CD — build automático do APK Android
├── README.md
└── vercel.json          # Configuração de deploy Vercel (raiz)
```

## Frentes do Projeto

### Web — `smarthvac-react/`
Versão modernizada do SmartHVAC em **React 18 + TypeScript + Vite + TailwindCSS**. Deploy automático no Vercel.

### Mobile — `app-mobile/`
Aplicativo Android (APK) desenvolvido com HTML/JS puro convertido para app nativo via **Capacitor**. Consome os dados do Firebase em tempo real.

### Mobile React Native — `rn-app/`
Versão alternativa do app mobile utilizando **React Native**.

## Deploy

- **Web:** [projeto-eng-ney.vercel.app](https://projeto-eng-ney.vercel.app)
- - **Mobile:** APK gerado via GitHub Actions (`.github/workflows/`)
  - 
