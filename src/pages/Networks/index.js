import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import {MdAddLink} from 'react-icons/md'
import { useEffect, useState } from "react";
import {db} from '../../services/firebaseConnection'
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore'
import {toast} from 'react-toastify'
export default function Networks(){
    const [github, setGithub] = useState('')
    const [instagram, setInstagram]= useState('')
    const [linkedin, setLinkedin]= useState('')
    
    useEffect(()=>{
        function loadLinks(){
            const docRef = doc(db, "social", "links");
            getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.data() !== undefined){
                    setGithub(snapshot.data().github);
                    setInstagram(snapshot.data().instagram);
                    setLinkedin(snapshot.data().linkedin);
                }    
            })
        }
        loadLinks();
    },[])
    
   
    function handleSave(e){
        e.preventDefault();
        setDoc(doc(db, "social", "links"),{
            github: github,
            instagram: instagram,
            linkedin: linkedin
        }).then(()=>{
            toast.success("Redes cadastradas")
        }).catch((error)=>{
            console.log("OCORREU O ERRO:", error)
            toast.error("ERRO AO CADASTRAR REDES")
        })
    }

    return(
        <div className="admin-container">
            <Header/>
            <h1 className="title-social">Redes Sociais</h1>
            <form className="form" onSubmit={handleSave}>
                <label className="label">Link do Github</label>
                <Input
                    type="url"
                    placeholder="Digite a url do Github..."
                    value={github}
                    onChange={(e)=>{
                        setGithub(e.target.value)
                    }}
                />

                 <label className="label">Link do instagram</label>
                <Input
                    type="url"
                    placeholder="Digite a url do instagram..."
                    value={instagram}
                    onChange={(e)=>{
                        setInstagram(e.target.value)
                    }}
                />
                 <label className="label">Link do linkedin</label>
                <Input
                    type="url"
                    placeholder="Digite a url do linkedin..."
                    value={linkedin}
                    onChange={(e)=>{
                        setLinkedin(e.target.value)
                    }}
                />

                <button className="btn-registro" type="submit">
                    Cadastrar rede social
                    <MdAddLink size={24} color="#FFF"/>
                </button>
            </form>
        </div>
    );
}