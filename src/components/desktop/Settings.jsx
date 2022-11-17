import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const Settings = () => {


  const { config, updateConfig } = useContext(UserContext)

  const handleClick = () => {
    updateConfig({ ...config, fish: { ...config.fish, background: 'red' }})
  }

  return (
    <div><button onClick={handleClick}>click</button></div>
  )
}

export default Settings