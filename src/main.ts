import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/*Firebase components */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0DZVrbLLnaco9QNBggAbiiF63KjW2atk",
  authDomain: "rtrnr-app.firebaseapp.com",
  projectId: "rtrnr-app",
  storageBucket: "rtrnr-app.appspot.com",
  messagingSenderId: "982902845457",
  appId: "1:982902845457:web:4f0e4c0a43542a7d2081b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});