import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import NetflixLogo from '../../NetflixLogo.png'
import {ImSearch} from 'react-icons/im'



const Header = () => {
  return (
        <nav className="header">

            <img src={NetflixLogo} alt="" />

            <div>
                <Link to="/tvshows">TV Shows</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/recentlyadded">Recently Added</Link>
                <Link to="/mylist">My List</Link>
            </div>
            <ImSearch/>
        </nav>
  )
}

export default Header