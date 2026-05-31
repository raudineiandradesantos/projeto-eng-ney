import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.smarthvac.app',
  appName: 'SmartHVAC',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: 'https://projeto-eng-ney-git-codex-855a8e-raudineiandradesantos-projects.vercel.app',
    cleartext: false
  }
};

export default config;
