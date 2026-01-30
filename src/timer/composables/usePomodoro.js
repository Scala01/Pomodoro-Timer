import { reactive, toRefs, readonly } from "vue";
import usePhases from "./usePhases.js";

const { getDefaultPhase } = usePhases();
/**
 * Voglio creare la gestione dei timer qui dentro.
 * Devo creare tre sessioni di timer: Work, Short break e Long break
 * Ciascuno deve avere un minutaggio e sapere se è di tipo WORK o BREAK
 * Qui dovrò considerare lo STATO ATTUALE DELL'APP-TIMER
 * Quindi ad ogni modifica e cambio di timer qui dentro verranno
 *  effettuate le modifiche dell'app per aggiornare il suo stato
 */

const phases = reactive({
  // pastSessions: mostra le sessioni di timer eseguite
  // path: mostra l'ordine con cui eseguire automaticamente le sessioni di timer
  history: [],
  current: null,
  // let path = [];
  //path: maps in cui w sb lb hanno un valore ciascuno. Chi ha zero è quello attuale, 1 è il prossimo e cosi via
  // ad ogni change del pastSessions va modificaro il path: ogni valore -1 tranne chi ha 0 che avrà valore di default
  // che dipenderà dall'ordine.
  // Dunque:
  //  - W:  0 1(ogni 1 break) //0 perchè parte work
  //  - SB: 1 1(ogni 1 work)
  //  - LB: 4 4(ogni 4 work)
  // dopo un round
  //  - W:  1 1
  //  - SB: 0 1
  //  - LB: 3 4
  //... altrimenti una queue...
});

//no qua il default -> non voglio farlo dipendere da TimerSession class
usePomodoro().setCurrentPhase(getDefaultPhase());

export default function usePomodoro() {
  const { history, current } = toRefs(phases);

  //to do: pastSessions contains past timer sessions only.
  // The current session must be stored in dedicated var only.
  // Then on every change of session, pastSessions and
  // currentSession must be updated as the past and current sessions
  function setCurrentPhase(phase) {
    phases.history.push(phase);
    phases.current = phase;
  }

  // const currentSession = computed(() => ...);

  return {
    currentPhase: readonly(current),
    setCurrentPhase,
  };
}

/**
 * HISTORY
 * Ogni sessione avrà un id
 * Voglio un metodo che salvi la cronologia: i timer sessions "vecchi" e quello corrente
 *
 * PATH
 * Voglio un metodo che imposti lo stato di default (il primo)
 * Voglio un path per i timer sessions successivi da eseguire: consluso quello corrente devo sapere quale eseguire dopo
 * Voglio un metodo che mi modifichi il path
 *
 * UPDATE SESSION TYPE - START-STOP-RELOAD-CHANGE TIMER
 * Voglio un metodo che "superi" di priorità il path, e modifichi forzatamente il session timer da eseguire subito!
 * Voglio un metodo che cambia lo stato da un timer session ad un altro
 */
