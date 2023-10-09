import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apps.mypiole',
  appName: 'MyPiole',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
