export function getEventForm(state) {
  return state.eventForm.data;
}

export function getErrors(state) {
  return state.eventForm.errors || [];
}

export function getHasChanged(state) {
  return state.eventForm.changed;
}

export function getIsSaved(state) {
  return state.eventForm.saved;
}

export function getIsWaiting(state) {
  return state.eventForm.waiting;
}
