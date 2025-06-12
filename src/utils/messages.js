const authMessages = {
  'auth/invalid-credential': 'Credenziali non valide. Controlla email e password.',
  'auth/user-not-found': 'Nessun utente trovato con questa email.',
  'auth/wrong-password': 'Password errata.',
  'auth/email-already-in-use': 'Questa email è già in uso. Prova ad accedere o usa un\'altra email.',
  'auth/weak-password': 'La password deve contenere almeno 6 caratteri.',
  'auth/invalid-email': 'Formato email non valido.',
  'auth/too-many-requests': 'Troppi tentativi falliti. Riprova più tardi.',
  // Aggiungi altri messaggi di errore Firebase qui
};

export function getAuthErrorMessage(errorCode) {
  return authMessages[errorCode] || 'Si è verificato un errore inaspettato. Riprova.';
} 