'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const APIURL = process.env.NEXT_PUBLIC_API_URL;
export default function LoginGoogle() {
    const router = useRouter();
    useEffect(() => {
        const handleGoogleLogin = async () => {
            console.log('APIURL entre');


            try {
                const googleResponse = await fetch('/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (googleResponse.ok) {
                    const googleUser = await googleResponse.json();
                    console.log('googleUser', googleUser);
                    if (googleUser?.email && googleUser.sub) {
                        console.log('googleEmail', googleUser.email);

                        const Flag = await fetch(`${APIURL}/user/google`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',

                            },
                            body: JSON.stringify({ email: googleUser.email })
                        })
                        const response = await Flag.json();
                        console.log('Flag', response);

                        if (response) {
                            const login = await fetch(`${APIURL}/auth/signin`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: googleUser.email,
                                    password: googleUser.sub,
                                })

                            })
                            const response = await login.json();
                            console.log('response', response);

                            localStorage.setItem(
                                'userSession',
                                JSON.stringify({ token: response.token, user: response.user })
                            );
                            router.push('/Home');

                        }
                        if (!response) {
                            console.log("ENTRE A !RESPONSE");
                            
                            const register = await fetch(`${APIURL}/auth/signup/google`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: googleUser.email,
                                    password: googleUser.sub,
                                    name: googleUser.name,
                                    profileImageUrl: googleUser.picture,
                                    username: googleUser.nickname,
                                })
                            })
                            const response = await register.json();
                            console.log('response', response);

                            if (!response) {
                                throw new Error('Error al registrar el usuario');
                            }
                            if (response) {
                                console.log('email', googleUser.email, 'sub', googleUser.sub);
                                const login = await fetch(`${APIURL}/auth/signin`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        email: googleUser.email,
                                        password: googleUser.sub,
                                    })

                                })
                                const response = await login.json();
                                console.log('response2', response);

                                localStorage.setItem(
                                    'userSession',
                                    JSON.stringify({ token: response.token, user: response.user })
                                );
                                router.push('/Home');

                            }
                        }
                    }
                }
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                })
                throw new Error("Error al verificar el usuario de Google:" + error);
            }

        }
        handleGoogleLogin();
    }, [router]);

    return (
        <div>
            <h2>'Verificando usuario...'</h2>
        </div>)

}
