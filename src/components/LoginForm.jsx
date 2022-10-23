import { useState } from "react";
import { APIhandleLogin } from "../api/actions";

const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const { error, user } = await APIhandleLogin(username, password)
        if(error) {
            setError(error)
            setLoading(false)
            return
        }
        setLoading(false)
        handleLogin(user)
    }


    return <form style={{ display: "flex", flexDirection: "column", padding: "40px", maxWidth: "400px", minWidth: "300px"}}onSubmit={handleSubmit}>
      username
      <input value={username} onChange={(e) => {
        setUsername(e.target.value)
        setError("")
      }}></input>
      password
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
        setError("")
      }}></input>
      <button>click me</button>
      {error}
      {loading && <p>loading...</p>}
    </form>
}

export default LoginForm
