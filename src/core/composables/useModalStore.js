import { reactive, toRefs, readonly } from "vue";

const state = reactive({
  modals: [],
});

let id = 0;

export default function useModalStore() {
  const { modals } = toRefs(state);

  function openModal(component, props = {}) {
    state.modals.push({
      id: ++id,
      component,
      props,
    });
  }

  function closeTopModal() {
    if (state.modals.length > 0) {
      state.modals.pop();
    }
  }

  return {
    modals: readonly(modals),
    openModal,
    closeTopModal,
  };
}
