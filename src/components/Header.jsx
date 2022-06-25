import logo from "../assets/images/logo.png"

const Header = ({ logoutUser }) => {
  return (
    <header>
      <img src={logo} alt="" />
      <button onClick={() => { logoutUser() }}>Logout</button>
    </header>
  )
}

export default Header