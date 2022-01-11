import React, { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import { InputText } from '../src/components/InputText';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Home.module.css'

export default function Home() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { signIn } = useContext(AuthContext)

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const data = {
			email,
			password
		}

		await signIn(data);
	}

	return (
		<div className={styles.main}>
			<Box
				component="form"
				noValidate
				sx={{
					display: 'grid',
					gridTemplateColumns: { sm: '1fr 1fr' },
					gap: 2,
				}}
				onSubmit={handleSubmit}
			>
				<FormControl variant="standard">
					<InputLabel shrink htmlFor="bootstrap-input">
						Email
					</InputLabel>
					<InputText value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="exemple@exemple.com" id="email-input" />
				</FormControl>
				<FormControl variant="standard">
					<InputLabel shrink htmlFor="bootstrap-input">
						Password
					</InputLabel>
					<InputText type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" placeholder="Digite a sua senha" id="password-input" />
				</FormControl>
				<Button size='large' variant="contained" type="submit">Entrar</Button>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<ToastContainer />
			</Box>
		</div>
	)
}


