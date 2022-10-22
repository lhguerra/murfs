<template>
  <div class="d-flex flex-column align-items-start">
    <p>Ela tá em</p>

      <h1 class="text-left text-white m-0 m-b-20">
        {{ current.name }}
      </h1>
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

  </div>

</template>

<script lang="ts">

import data from '../../data.json'


export default {
  data () {
    return {
      current: data.places[data.current]
    }
  }
}

</script>
