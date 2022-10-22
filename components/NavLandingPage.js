import React from 'react';
import Image from 'next/image'
 
class NavLandingPage extends React.Component {
 
  render() {
 
  	return (
        
  		<nav className="navbar">
            <div className="navbar-section-brand">
                <Image
                    priority
                    src="/images/logo.svg"
                    height={100}
                    width={100}
                    alt="logo"
                    className="logo-image"
                />
                <div className="navbar-section-brand-text">
                    <h2 className="h2-1">EAST WOOD</h2>
                    <h2 className="h2-1">CLINIC</h2>
                </div>

            </div>
		    <div className="navbar-section-pages">
			    <ul className="navbar-section-pages-links">
			        <li className="nav-item-home">
			          	<a className="nav-link" >Home </a>
			        </li>
			        <li className="nav-item-about-us">
			          	<a className="nav-link" >Sobre Nosotros</a>
			        </li>
			        <li className="nav-item-contact">
			          	<a className="nav-link" >Contacto</a>
			        </li>
			        <li className="nav-item-login">
			          	<a href="login" className="nav-link" >Iniciar Sesión</a>
			        </li>
			    </ul>
		    </div>
 
		</nav>
 
  	)
    
  }
 
}
 
export default NavLandingPage;