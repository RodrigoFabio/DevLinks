import { useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({children}){
    const [loading, setLoading]= useState(true);
    const [logado, setLogado] = useState(false);

    useEffect(()=>{
        async function checkLogin(){
            const unsub =onAuthStateChanged(auth, (user)=>{
                if(user){
                    const userData={
                        uid: user.uid,
                        email: user.email
                    };
                    localStorage.setItem("@detailUser", JSON.stringify(userData))
                    setLoading(false);
                    setLogado(true);
                }else{
                    setLoading(false);
                    setLogado(false);
                }
            })
        }

        checkLogin();
    }, [])


    if(loading){
        return <div >
                 <p style={{justifyContent:"center", alignItems:"center"}}>Carregando</p>
              </div>
    }

    if(!logado){
        return <Navigate to="/login"/>
    }
    return children;
}