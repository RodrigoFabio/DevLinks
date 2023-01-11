import { Header } from "../../components/Header";
import './admin.css'
import {Logo} from '../../components/Logo'
import {Input} from '../../components/Input'
import {toast} from 'react-toastify'
import {MdAddLink} from 'react-icons/md'
import {FiTrash2} from 'react-icons/fi'
import { useState, useEffect } from "react";
import {db} from '../../services/firebaseConnection'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'



export default function Admin(){
    const [nameInput, setNameInput]= useState('');
    const [urlInput, setUrlInput]= useState('');
    const [backgroundColorInput, setBackgroundColorInput] = useState('');
    const [textColor, setTextColor]= useState('');
    const [links, setLinks]=useState([]);
    
    useEffect(()=>{
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot)=>{
        let lista = [];
        
        snapshot.forEach((doc)=>{
            lista.push({
                id: doc.id,
                name: doc.data().name,
                url: doc.data().url,
                bg: doc.data().bg,
                color: doc.data().color
            })
        })
        setLinks(lista);

        })
    }, [])


    async function handleRegister(e){
         e.preventDefault();
        
         addDoc(collection(db, "links"),{
            name:nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color:textColor,
            created: new Date(),
         })
         .then(()=>{
            setNameInput("");
            setUrlInput("");
         })
         .catch((error)=>{
            toast.error("nao funcionou"+ error);
         })
    }

    async function handleDeleteLink(id){
        const docRef= doc(db, "links", id)
        await deleteDoc(docRef)
    }
    return(
        <div className="admin-container">
            <Header/>

            <Logo/>

            <form className="form" onSubmit={handleRegister}>
                <label className="label"> Nome do link</label>
                <Input
                    placeholder="Digite o nome do link"
                    required
                    value={nameInput}
                    onChange={(event)=>{
                        setNameInput(event.target.value);
                    }}
                />

                <label className="label">url do link</label>
                <Input
                    type="url"
                    required
                    placeholder="Digite a url do link" 
                    value={urlInput}
                    onChange={(event)=>{
                        setUrlInput(event.target.value)
                    }}
                />
                <section className="container-colors">
                    <div>
                        <label className="label right"> Fundo do link</label>
                        <input 
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e)=>{
                                setBackgroundColorInput(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label className="label right"> Cor do link</label>
                        <input 
                            type="color"
                            value={textColor}
                            onChange={(e)=>{
                                setTextColor(e.target.value);
                            }}
                        />
                    </div>       

                </section>

                { nameInput &&  <div className="preview">
                   <label className="label">Veja como está ficando</label>
                   <article className="list" style={{backgroundColor: backgroundColorInput, marginTop:8, marginBottom:8}}>
                    <p style={{color:textColor}}>{nameInput}</p>
                   </article>
                </div> }    

                <button className="btn-registro" type="submit">
                    Cadastrar <MdAddLink size={24} color="#FFF"/>
                </button>
            </form>

            <h2 className="title">Meus links</h2>
           {links.map((item, index)=>(
             <article 
             key={index}
             className="list animate-pop"
             style={{ backgroundColor:item.bg, color:item.color}}
             > 
                 <p>{item.name}</p>
                 <div>
                     <button className="btn-delete" onClick={()=>handleDeleteLink(item.id)}>
                         <FiTrash2 size={18} color="#FFF"/>
                     </button>
                 </div>
             </article>
           ))}
        </div>
    );
}