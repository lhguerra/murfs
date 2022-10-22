import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

declare global {
  interface Window { deferredPrompt: any; }
}

window.addEventListener('beforeinstallprompt', function(e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
});

createApp(App).mount('#app')
