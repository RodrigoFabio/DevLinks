 import './login.css'
 import {Logo} from '../../components/Logo'
 import { useState } from 'react';
 import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { Input } from '../../components/Input';
 export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha]= useState('');
    const navigate = useNavigate();

    function handleLogin(event){
        event.preventDefault();
        
        signInWithEmailAndPassword(auth, email, senha).then(()=>{
          
            toast.success( 'Acesso permitido');
            navigate('/admin', {replace: true});
        })
        .catch(()=>{
            toast.error('Erro ao tentar fazer login');
        })

    }

    return(
        <div className='login-container'>
            <Logo/>
            <form className='form' onSubmit={handleLogin}>
                <Input
                type="email"
                placeholder='Digite seu email...'
                required
                value={email}
                onChange={function(event){
                    const valor =event.target.value;
                    setEmail(valor);
                }}/>
                
                 <Input
                    type="password"
                    placeholder='*******'
                    autoComplete="on"
                    required
                    value={senha}
                    onChange={function(event){
                        const valor =event.target.value;
                        setSenha(valor);
                    }}
                />
                <button type='submit' >Acessar</button>
            </form>
        </div>

    );
 }