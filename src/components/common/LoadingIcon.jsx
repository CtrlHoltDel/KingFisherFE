import React from 'react'

import loadingSVG from '../../assets/loading.svg'

const LoadingIcon = () => {
  return (
    <img className='deleting-icon' style={{ ...BOTTOM_RIGHT_CORNER, ...SMALL, zIndex: 3 }} src={loadingSVG} alt="loading-icon"></img>
  )
}

export default LoadingIcon

const BOTTOM_RIGHT_CORNER = { position: "absolute", right: "3px", bottom: "3px" }
const SMALL = { height: "25px", width: "25px" }