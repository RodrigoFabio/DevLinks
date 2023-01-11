import './Error.css'
import {Link} from 'react-router-dom'
import {Logo} from '../../components/Logo';
import React from 'react';
import imagem from './notFound.png'
export default function Error(){
    return(
        <div className='error'>
            <h1 className='title-erro'>Página não encontrada</h1>
            <img className='imagem' src={imagem} alt="Imagem not found"/>
            <Link className='link' to="/">
                Home
            </Link>
            
        </div>
    );
}