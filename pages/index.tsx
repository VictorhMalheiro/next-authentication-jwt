import React, {FormEvent, useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext)

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
        <form onSubmit={handleSubmit} className={styles.container}>
          <label className={styles.label} htmlFor="email">Email
            <input placeholder='exemple@exemple.com' className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="" />
          </label>
          <label className={styles.label} htmlFor="password">Senha
            <input placeholder='Digite sua senha' className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="" />
          </label>
          <button className={styles.button} type="submit">Entrar</button>
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
            {/* Same as */}
          <ToastContainer />
        </form>
    </div>
  )
}


