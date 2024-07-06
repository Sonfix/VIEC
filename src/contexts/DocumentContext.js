import React, { useContext, useState, useEffect } from "react"
import { addDoc, collection, getDocs,  query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { store } from "../APIs/firebase"
import { useAuth } from "./AuthContext";
import {Encrypt, Decrypt} from "../components/utils/encryption"
import {
    ProductDescription,
    Image,
    Description,
    Tag
} from "./data_handling"


const default_prompt = 
// eslint-disable-next-line no-multi-str
'Bitte analysiere die beigefügten Bilder und erstelle eine detaillierte Produktbeschreibung. Die Beschreibung soll SEO-optimiert sein und folgende Aspekte beinhalten: \
1. Produktname \
2. Hauptmerkmale und Spezifikationen \
3. Vorteile und Nutzen des Produkts \
4. Materialien und Qualität \
5. Anwendungsbereiche und Zielgruppe \
6. Pflegehinweise (falls zutreffend) \
7. Besonderheiten oder Alleinstellungsmerkmale \
\
Zusätzlich erstelle bitte eine Liste von relevanten Tags für dieses Produkt. Der Output soll in einem strukturierten Format sein, das für die automatisierte Weiterverarbeitung geeignet ist. \
\
Beispiel fuer den Output:\
{\
  "Produktname": "Beispiel Produktname",\
  "Beschreibung": "Dies ist eine detaillierte und SEO-optimierte Produktbeschreibung...",\
  "Hauptmerkmale": ["Merkmal 1", "Merkmal 2", "Merkmal 3"],\
  "Vorteile": ["Vorteil 1", "Vorteil 2"],\
  "Materialien": "Hochwertiges Material XYZ",\
  "Anwendungsbereiche": ["Bereich 1", "Bereich 2"],\
  "Zielgruppe": "Zielgruppe XYZ",\
  "Pflegehinweise": "Pflegehinweis XYZ",\
  "Besonderheiten": "Besonderheit XYZ",\
  "Tags": ["Tag1", "Tag2", "Tag3"]\
}';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const DocumentContext = React.createContext();

export function useDocContext() {
    return useContext(DocumentContext)
}

/*
    General Structur of handled documents
    Each Document will represent a singel item with in the state.Documents array
    A Document in certain will have the following structue
    createdAt: DateTime Stamp of Server
    title: Title of document
    owner: will be the uid of the creating user
    rw_data: will be the raw data format the app is using -> Structure needs to be defined
    last_edited: DateTime Stamp of server from last saving process
*/
export function DocumentProvider({ children }) {

    const [Documents, setDocuments] = useState(
        []
    );

    const [currentDocument, setCurrentDoc] = useState(
        null
    );
    
    let init = false;

    const { currentUser } = useAuth();

    /**
     * sends request via google firestore API to retrive documents
     */
    async function _request_documents() {    
        const q = query(collection(store, "prodcut_descriptions"), 
                        where("user", "==", currentUser.uid));

        const querySnapshot = await getDocs(q);
        
        let _docs = [];
        querySnapshot.forEach((doc) => {
            let buff = new ProductDescription()
                            .setUser(doc.data().user)
                            .setCategory(doc.data().category)
                            .setPrompt(doc.data().prompt)
                            .setChanged(false);

            // console.log("Requested Document: ", buff)
            _docs.push(buff);
        });

        // this creates a true deep copy of docs 
        // https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
        setDocuments([..._docs]);
    }

    // /**
    //  * sends the documents to firestore
    //  */
    // async function _set_documents() {
    //     console.log("Start uploading to cloud", Documents)
    //     Documents.forEach(doc => {
    //         if (doc.getChanged() && !doc.getDataByKey("toDelete")) {       // Don't upload stuff which has not changed. So in most caes we will only upload/update one document per cycle.     
    //             if(doc.getDataByKey("cnt_id") === "") {
    //                 // not in firestore upload
    //                 console.log("Adding to cloud", doc)
    //                 const docRef = addDoc(collection(store, "diagramms"), {
    //                         "createdAt": doc.getDataByKey("createdAt"),
    //                         "title": doc.getDataByKey("title"),
    //                         "owner": doc.getDataByKey("owner"),
    //                         "cnt_id": doc.getDataByKey("cnt_id"),
    //                         "rw_data": Encrypt(doc.getDataByKey("rw_data"), currentUser),
    //                         "last_edited": doc.getDataByKey("last_edited"),
    //                 }) 
    //                 doc.updateData("cnt_id", docRef.id)
    //             }
    //             else {
    //                 console.log("Upating in cloud", doc)
    //                 const docRef = doc(store, "diagramms", doc.getDataByKey("cnt_id"))
    //                 updateDoc(docRef, {
    //                     "createdAt": doc.getDataByKey("createdAt"),
    //                     "title": doc.getDataByKey("title"),
    //                     "owner": doc.getDataByKey("owner"),
    //                     "cnt_id": doc.getDataByKey("cnt_id"),
    //                     "rw_data": Encrypt(doc.getDataByKey("rw_data"), currentUser),
    //                     "last_edited": doc.getDataByKey("last_edited"),
    //                 })
    //             }
    //             doc.setChanged(false)
    //         }
    //         else if (doc.getDataByKey("toDelete")) {
    //             _deleteDocument(doc)
    //         }
    //     })
    // }

    // async function _deleteDocument(doc) {
    //     const docRef = doc(store, "diagramms", doc.getDataByKey("cnt_id"))
    //     await deleteDoc(docRef);
    // }

    /**
     * creates new Document for User
     */
    function createDescription() {
        let newDoc = new ProductDescription()
                        .setUser(currentUser.uid)
                        .setCategory()
                        .setPrompt(default_prompt)
                        .setChanged(false);

        Documents.push(newDoc);
        
        localStorage.setItem("documents", JSON.stringify(Documents));
        setDocuments(Documents);
    }

    // function getDocuments() {
    //     if (Documents.length === 0) {
    //         // default_document.rw_data.Childs.forEach(child => {
    //         //     child.color = getRandomColor()
    //         // })
    //         let newDoc = new Document()
    //                         .addData("owner", currentUser.uid)
    //                         .addData("title", "Neues Dokument")
    //                         // .addData("rw_data", default_document.rw_data)
            
    //         Documents.push(newDoc);
    //         setDocuments(Documents)
    //     }
    //     return Documents;
    // }

    // function getDocument(idx) {
    //     return Documents[idx];
    // }

    // function setCurrentDocument(idx) {
    //     let docRef = getDocument(idx)
    //     localStorage.setItem("currentDocument",  JSON.stringify(docRef.getData()));
    //     setCurrentDoc(docRef);
    // }

    // function updateDocument(document) {
    //     document.updateData("last_edited", Date.now())
    //     setCurrentDoc(document)
        
    //     localStorage.setItem("currentDocument",  JSON.stringify(document.getData()));
    //     Documents.forEach(doc => {
    //         if (doc.matches(document)) {
    //             doc.updateData("rw_data", document.getDataByKey("rw_data"))
    //         }
    //     });
    //     localStorage.setItem("documents", Documents);
    //     setDocuments(Documents);
    // }

    function    Sync() {
        if (!init) {
            console.log("Requesting")
            // _request_documents();
            init = true;
        }
        else {
            // _set_documents(Documents)
        }
    }

    // function deleteDocument(id) {
    //     // the id will be the current index within the Documents Array
    //     let doc = getDocument(id)
    //     doc.addData("toDelete", true).setChanged(true)
    //     init = false;
    //     // Sync()
    // }

    useEffect(() => {
        Sync();
    })

    // const value = {
    //     currentDocument,
    //     getDocuments,
    //     getDocument,
    //     createDocument,
    //     setCurrentDocument,
    //     updateDocument,
    //     deleteDocument,
    // }

    const value = {

    }

   return(
        <DocumentContext.Provider value={value}>
            {children}
        </DocumentContext.Provider>
    );
}
