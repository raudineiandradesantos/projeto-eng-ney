# Gerar APK (Android) — SmartHVAC

Este repositório agora está preparado para empacotar o app como APK via **Capacitor (Node.js)** sem alterar regras de negócio.

## Pré-requisitos
- Node.js 20+
- Android Studio + Android SDK + JDK 17

## Passo a passo
1. Instalar dependências:
   ```bash
   npm install
   ```
2. Inicializar Capacitor (primeira vez):
   ```bash
   npm run cap:init
   ```
3. Adicionar Android (primeira vez):
   ```bash
   npm run cap:add:android
   ```
4. Sincronizar:
   ```bash
   npm run cap:sync
   ```
5. Gerar APK debug:
   ```bash
   npm run apk:debug
   ```

APK gerado em:
- `android/app/build/outputs/apk/debug/app-debug.apk`

## Produção (release)
```bash
npm run apk:release
```

## Observação
- O app usa `server.url` em `capacitor.config.ts` para abrir a versão publicada na Vercel.
- Para trocar ambiente (staging/prod), basta alterar `server.url`.
