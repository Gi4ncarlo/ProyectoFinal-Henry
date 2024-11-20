import React, { useState, useEffect } from 'react';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const CheckGoogle: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkGoogleLogin = async () => {
      try {
        const googleResponse = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (googleResponse.ok) {
          const googleUser = await googleResponse.json();
          console.log('googleUser', googleUser);

          if (googleUser?.email && googleUser.sub) {
            const flagResponse = await fetch(`${APIURL}/user/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: googleUser.email }),
            });
            const flagData = await flagResponse.json();
            console.log('Flag', flagData);

            if (flagData) {
              // Login flow
              const loginResponse = await fetch(`${APIURL}/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: googleUser.email,
                  password: googleUser.sub,
                }),
              });
              const loginData = await loginResponse.json();
              console.log('Login response', loginData);

              localStorage.setItem(
                'userSession',
                JSON.stringify({ token: loginData.token, user: loginData.user })
              );
              setIsUserLoggedIn(true);
              return;
            } else {
              // Register flow
              const registerResponse = await fetch(`${APIURL}/auth/signup/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: googleUser.email,
                  password: googleUser.sub,
                  name: googleUser.name,
                  profileImageUrl: googleUser.picture,
                  username: googleUser.nickname,
                }),
              });
              const registerData = await registerResponse.json();
              console.log('Register response', registerData);

              if (registerData) {
                const loginResponse = await fetch(`${APIURL}/auth/signin`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: googleUser.email,
                    password: googleUser.sub,
                  }),
                });
                const loginData = await loginResponse.json();
                console.log('Login response after register', loginData);

                localStorage.setItem(
                  'userSession',
                  JSON.stringify({ token: loginData.token, user: loginData.user })
                );
                setIsUserLoggedIn(true);
              } else {
                throw new Error('Error al registrar el usuario');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error al verificar el usuario de Google:', error);
      }
    };

    checkGoogleLogin();
  }, []);

  return <div>{isUserLoggedIn ? `push('/Home')` : 'Verificando usuario...'}</div>;
};

export default CheckGoogle;