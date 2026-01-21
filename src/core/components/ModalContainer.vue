<script setup>
import useModalStore from "@core/composables/useModalStore";

const { modals, closeTopModal } = useModalStore();
</script>

<template>
  <Teleport to="body">
    <!-- <Transition> -->
    <component
      v-for="(modal, index) in modals"
      :key="modal.id"
      :is="modal.component"
      v-bind="modal.props"
      :z-index="1000 + index"
      @close="closeTopModal"
    />
    <!-- </Transition> -->
  </Teleport>
</template>
