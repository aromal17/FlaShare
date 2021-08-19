import React, {useState , useEffect} from 'react'
import logo from '../../resources/logo.png'
import './header.css'
import { NavLink } from 'react-router-dom'
export default function Header() {

    return (
        <>
            
            <header>
                
                <div className="container" >
                    <div className="row justify-content-between py-3">

                        <div className="col-2">
                            <img src={logo} alt="flashare logo" id = "logo"/>
                            {/* <img src="https://img.icons8.com/color/48/000000/github--v1.png"/> */}
            
                        </div>
                    </div>
                </div><img />
             </header>
             <a href ="https://github.com/aromal17/Flashare" aria-label="View source on GitHub" target="_blank"><img className ="githubIcon" src="https://img.icons8.com/color/48/000000/github--v1.png"/></a>
             <p className="quote">Generate file link and (fla)share it.</p>
            
        </>

    )
}