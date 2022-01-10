import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me').then(response => console.log(response))
  }, [])

  return (
    <div className="main">
      <h1>Dashboard</h1>
      <h3>Seja bem vindo: {user?.email}</h3>
    </div>
  );
}