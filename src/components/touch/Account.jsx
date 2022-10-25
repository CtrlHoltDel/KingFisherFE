import React from 'react'

const Account = ({ user, logoutUser }) => {
  return (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Account