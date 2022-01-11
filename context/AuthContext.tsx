import { createContext, ReactNode, useState, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies'
import { ToastContainer, toast } from 'react-toastify';
import Router from "next/router";

import { api } from "../services/api";

type User = {
	email: string;
	permissions: string[];
	roles: string[];
}

type SignInCredentials = {
	email: string;
	password: string;
}

type AuthContextData = {
	signIn(credentials: SignInCredentials): Promise<void>;
	user: User;
	isAuthenticated: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>();
	const isAuthenticated = !!user;

	useEffect(() => {
		const { 'nextauth.token': token } = parseCookies();

		if (token) {
			api.get('/me').then(response => {
				const { email, permissions, roles } = response.data;

				setUser({ email, permissions, roles });
			});
		}
	}, []);

	async function signIn({ email, password }: SignInCredentials) {
		try {
			const response = await api.post('/sessions', {
				email,
				password
			})

			const { token, refreshToken, permissions, roles } = response.data;

			setCookie(undefined, 'nextauth.token', token, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/'
			});
			setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/'
			});

			setUser({
				email,
				permissions,
				roles
			})

			toast.success(`😎 Deu certo! Seja bem vindo:  ${email}}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

			api.defaults.headers['Authorization'] = `Bearer ${token}`;

			Router.push('/dashboard');
		} catch (error) {
			console.log(error)

			if (error.response.status === 401) {
				toast.warn('😔 Ohhh no!! Login ou senha incorretos!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log(error)
			} else if (error.response.status === 404) {
				toast.warn('😔 Ohhh no!! Usuário não encontrado!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else if (error.response.status === 403) {
				toast.warn('😔 Ohhh no!! Você não tem permissão!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log(error)
			} else if (error.response.status === 500) {
				toast.error('😔 Ohhh no!! Algo deu errado!', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log(error)
			}

		}
	}

	return (
		<AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
			{children}
		</AuthContext.Provider>
	)
}
