import { useState } from "react";
import { APIHandleLogin, APIHandleRegister } from "../../api/actions";

const LoginForm = ({  handleSetUser }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        setLoading(true)
        const { error, user } = await APIHandleLogin(username, password)
        if(error) {
            setError(error)
            setLoading(false)
            return
        }
        setLoading(false)
        handleSetUser(user)
    }

    const handleRegister = async (e) => {
      setLoading(true)
      const { error } = await APIHandleRegister(username, password)
      if(error) {
          setError(error)
          setLoading(false)
          return
      }
      setLoading(false)
    }

    return <div>
      <form style={{ display: "flex", flexDirection: "column", padding: "40px", maxWidth: "400px", minWidth: "300px"}}>
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
        {error}
        {loading && <p>loading...</p>}
      </form>
      <button onClick={handleLogin}>Log in</button>
      <button onClick={handleRegister}>Register</button>
    </div>
}

export default LoginForm
