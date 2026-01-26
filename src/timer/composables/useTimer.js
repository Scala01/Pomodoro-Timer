/*  -----------------------------------------------------------------------------------------------
  Timer Type 
--------------------------------------------------------------------------------------------------- */

/**
 * Voglio creare la gestione dei timer qui dentro.
 * Devo creare tre sessioni di timer: Work, Short break e Long break
 * Ciascuno deve avere un minutaggio e sapere se è di tipo WORK o BREAK
 * Qui dovrò considerare lo STATO ATTUALE DELL'APP-TIMER
 * Quindi ad ogni modifica e cambio di timer qui dentro verranno
 *  effettuate le modifiche dell'app per aggiornare il suo stato
 */

/**
 *
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
