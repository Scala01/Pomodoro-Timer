<script setup>
import TimerApp from "@timer/components/TimerApp.vue";
import ModalContainer from "@modal/components/ModalContainer.vue";
</script>

<template>
  <div
    id="app"
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <h1 class="play-bold mb-5 w-100">
      Pomodoro <br />
      Timer
    </h1>

    <TimerApp />
    <ModalContainer />
  </div>
</template>

<style></style>
