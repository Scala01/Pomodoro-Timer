<script>
import {
  getFormattedSeconds,
  getMinutesBySeconds,
  getFormattedTime,
} from "../../js/utils/timeHandler";

export default {
  emit: ["timeConfirmed"],
  props: {
    time: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newTime: this.time,
      onEdit: false,
    };
  },
  computed: {
    formattedTime() {
      return getFormattedTime(this.newTime);
    },
  },
  methods: {
    changeTime(value) {
      if (value < 0 && this.newTime <= Math.abs(value)) {
        this.newTime = 0;
      } else {
        this.newTime = this.newTime + value;
      }
    },
    changeOnEdit() {
      this.onEdit ? (this.onEdit = false) : (this.onEdit = true);
    },
    reset() {
      this.newTime = this.time;
      this.changeOnEdit();
    },
    confirm() {
      this.$emit("timeConfirmed");
      this.changeOnEdit();
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column m-3">
    <div class="fs-5 p-1 text-start"><label for="time">Duration</label></div>

    <div id="time" class="d-flex flex-row justify-content-between">
      <div
        class="input-style d-flex flex-row align-items-center justify-content-between px-3 py-2 w-100"
      >
        <span class="fs-3"> {{ formattedTime }}</span>
        <button
          v-show="!onEdit"
          type="button"
          class="btn btn-secondary btn-icon"
          @click="changeOnEdit"
        >
          <i class="bi bi-pencil-fill"></i>
        </button>
      </div>
      <div class="d-flex flex-column ms-2">
        <button
          v-show="onEdit"
          type="button"
          class="btn btn-primary btn-icon mb-1"
          @click="changeTime(+30)"
        >
          <i class="bi bi-chevron-up"></i>
        </button>
        <button
          v-show="onEdit"
          type="button"
          class="btn btn-primary btn-icon"
          @click="changeTime(-30)"
        >
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>
    </div>

    <div v-show="onEdit" class="mt-3">
      <button
        type="button"
        class="btn btn-secondary btn-icon-lg"
        @click="reset"
      >
        <i class="bi bi-arrow-counterclockwise"></i>
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-icon-lg"
        @click="confirm"
      >
        <i class="bi bi-check-lg"></i>
      </button>
    </div>
  </div>
</template>

<style>
.input-style {
  background-color: #eee;
  border-radius: 8px;
}
</style>
