import React from 'react'
import loader from '../assets/loader.gif'

const Spinner = () => {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{height: '30vh'}}>
        <img src={loader} alt="loader" />
      </div>
    )
}

export default Spinner;