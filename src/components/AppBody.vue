<template>
  <div class="d-flex flex-column align-items-start">
    <p>Ela tá em</p>

      <h1 class="text-left text-white m-0 m-b-20">
        {{ current.name }}
      </h1>
      <a v-on:click="install">Instalar</a>
      <p>{{ current.address }}</p>
      <div class="map-block m-b-40">
        <iframe :src="current.mapUrl" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <img src="../assets/img/pinLogo.svg" class="pin">
        <a href="https://goo.gl/maps/gc2tiL7DSWxRqEf1A" target="_blank" class="d-block button">Abrir mapa</a>
      </div>
      <p class="text-white m-0">Links úteis do pico</p>
      <ul class="custom-list">
        <li v-for="link in current.links" :key="link.name">
          <a :href="link.url" target="_blank">
            {{ link.name }}
          </a>
        </li>
      </ul>
      <a href="https://lula.com.br/" class="button w-100">Ele sim!</a>
  </div>

</template>

<script>

import data from '../../data.json'


export default {
  data () {
    return {
      current: data.places[data.current]
    }
  },
  methods: {
    install: async function (event) {
      console.log('👍', 'butInstall-clicked');
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
      }
      // Show the install prompt.
      promptEvent.prompt();
      // Log the result
      const result = await promptEvent.userChoice;
      console.log('👍', 'userChoice', result);
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button.
      this.classList.toggle('hidden', true);
    }
  }
}

</script>
