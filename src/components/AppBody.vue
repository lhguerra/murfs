<template>
  <div class="d-flex flex-column align-items-start">
    <p>Ela tá em</p>

    <div v-if="currentIndex < 0" class="w-100">
      <h1 class="text-white m-0 m-b-40">
        Casa
      </h1>
      <div class="map-block m-b-40">
        <img src="../assets/img/em-casa.jpeg">
      </div>
    </div>

    <div v-if="currentIndex >= 0" class="w-100">
      <h1 class="text-white m-0 m-b-20">
        {{ current.name }}
      </h1>
      <p class="m-b-40">{{ current.address }}</p>
      <div class="map-block m-b-40" v-if="currentIndex >= 0">
        <iframe :src="current.mapUrl" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <img src="../assets/img/pinLogo.svg" class="pin">
        <a :href="current.externalMapUrl" target="_blank" class="d-block button">Abrir mapa</a>
      </div>

      <p class="text-white m-0">Links úteis do pico</p>
      <ul class="custom-list m-b-40">
        <li v-for="link in current.links" :key="link.name">
          <a :href="link.url" target="_blank">
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>

      <p class="text-white">Roteiro</p>

      <ul class="itinerary-list m-b-40">
        <li v-for="(place, index) in places" :key="place.name"
          class="text-left"
          :class="{
            visited: index < currentIndex,
            current: index === currentIndex
          }">
            <a :href="place.externalMapUrl" target="_blank">
              {{ place.name }}
            </a>
          </li>
      </ul>

      <a href="javascript:void(0)" v-on:click="install" class="button w-100 m-b-20 button--white">Instalar o app da Snurf</a>

      <a href="https://lula.com.br/" target="_blank" class="button w-100">Não c1iqu3</a>
  </div>

</template>

<script>

import data from '../../data.json'


export default {
  data () {
    return {
      places: data.places,
      currentIndex: data.current,
      current: data.places[data.current]
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      window.addEventListener('beforeinstallprompt', function(e) {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
      });
    })
  },
  methods: {
    install: async function (event) {
      console.log('👍', 'butInstall-clicked');
      const promptEvent = window.deferredPrompt;
      console.log('how is the prompt feeling?', promptEvent)
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
    }
  }
}

</script>
