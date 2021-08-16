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
                        </div>

                    </div>
                </div>
             </header>
            
        </>

    )
}