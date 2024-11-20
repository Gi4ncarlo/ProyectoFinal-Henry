import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

// Configura la URL de redirección después del login
export const GET = handleAuth({
  async login(req, res) {
    await handleCallback(req, res, {
      redirectUri: 'http://localhost:3001/loadingGoogle', // Cambia esto por tu URL deseada
    });
  },
});