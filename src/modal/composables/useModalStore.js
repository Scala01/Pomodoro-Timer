import { reactive, toRefs, readonly, markRaw } from "vue";

const state = reactive({
  modals: [],
});

let id = 0;

export default function useModalStore() {
  const { modals } = toRefs(state);

  function openModal(component, props = {}) {
    state.modals.push({
      id: ++id,
      // component: markRaw(component),
      component,
      props,
    });

    //draft: add overflow hidden
    let body = document.querySelector("body");
    body.classList.add("overflow-hidden");
  }

  function closeTopModal() {
    if (state.modals.length > 0) {
      state.modals.pop();
    }

    //draft: remove overflow hidden
    let body = document.querySelector("body");
    if (state.modals.length <= 0) body.classList.remove("overflow-hidden");
  }

  return {
    modals: readonly(modals),
    openModal,
    closeTopModal,
  };
}
