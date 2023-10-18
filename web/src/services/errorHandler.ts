function errorHandler(err: Error, emit) {
  // Handle the error here, for example, log it, show a toast message, etc.
  console.error('An error occurred:', err);

  // Emit an event to show the modal with the error message
  app.config.globalProperties.$root.$emit('showErrorModal', err.message);
}

export default {errorHandler};
