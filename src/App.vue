<script setup>
import TimerApp from "@timer/components/TimerApp.vue";
import ModalContainer from "@modal/components/ModalContainer.vue";
</script>

<template>
  <div class="overflow-x-hidden d-flex flex-column justify-content-center">
    <h1 class="play-bold mb-5 w-100">Pomodoro<br />Timer</h1>
    <TimerApp />
    <ModalContainer />
  </div>
</template>
