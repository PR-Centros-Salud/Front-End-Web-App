import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const TopBar = () => {
  return (
    <div className='top-bar-section'>
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
        <input type="text" placeholder="Buscar..." />
    </div>      
  )
}

export default TopBar