import React, { useContext, useState, useEffect } from "react"
import { 
    addDoc,
    collection, 
    getDocs, 
    query, 
    where, 
    updateDoc, 
    deleteDoc,
    serverTimestamp 
} from 'firebase/firestore';
import { store } from "../APIs/firebase"
import { useAuth } from "./AuthContext";
import {Encrypt, Decrypt} from "../components/utils/encryption"
import {
    ProductDescription,
    Image,
    Description,
    Tag
} from "./data_handling"

// import ProductDescription from './data_handling/product_desc'

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
Bitte achte darauf das die Beschreibung mindest 100 Worte lang sein muss. \
\
Beispiel fuer den Output:\
{\
  "Produktname": "Beispiel Produktname",\
  "Titel": "Ein Aussagekräftiger, zum verkauf anregender Titel",\
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

const DocumentContext = React.createContext();

export function useDocContext() {
    return useContext(DocumentContext)
}

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
                            .setImages(doc.data().images)
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
    async function _set_documents() {
        console.log("Start uploading to cloud", Documents)
        Documents.forEach(doc => {
            if (doc.getChanged() && !doc.getToDelete()) {       // Don't upload stuff which has not changed. So in most caes we will only upload/update one document per cycle.     
                if(doc.getCntId() === "") {
                    // not in firestore upload
                    console.log("Adding to cloud", doc)
                    
                    // if we upload newly added doc, than upload the image obj ref to
                    
                    doc.getImages().map((img) => {
                        addDoc(collection(store, "images"), {
                                "name": img.getName(),
                                "image_link": img.getImage_Link(),
                                "active": true,
                                "shouldBeDeleted": false,
                                "mimeType": img.getMimeType()
                        }).then((ref) => {
                            img.setCntId(ref.id);
                            img.setChanged(false);
                            
                            doc.setCreatedAt(serverTimestamp ());
                            addDoc(collection(store, "product_descriptions"), {
                                "createdAt": doc.getCreatedAt(),
                                "user" : doc.getUser(),
                                "prompt": doc.getPrompt(),
                                "status": 0,
                                "images": doc.getImages().map(obj => obj.getCntId()),
                            }).then((docRef) => {
                                doc.setCntId(docRef.id);
                                doc.setChanged(false);
                            })
                            
                        })
                    })                    
                }
                else {
                    console.log("Upating in cloud", doc)
                    // const docRef = doc(store, "diagramms", doc.getDataByKey("cnt_id"))
                    // updateDoc(docRef, {
                    //     "createdAt": doc.getDataByKey("createdAt"),
                    //     "title": doc.getDataByKey("title"),
                    //     "owner": doc.getDataByKey("owner"),
                    //     "cnt_id": doc.getDataByKey("cnt_id"),
                    //     "rw_data": Encrypt(doc.getDataByKey("rw_data"), currentUser),
                    //     "last_edited": doc.getDataByKey("last_edited"),
                    // })
                }
                doc.setChanged(false)
            }
            // else if (doc.getDataByKey("toDelete")) {
            //     // _deleteDocument(doc)
            // }
        })
        // localStorage.setItem("documents", JSON.stringify(Documents));
    }

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
                        .setCategory(null)
                        .setPrompt(default_prompt)
                        .setChanged(false);
        
        
        // let newImage = new Image()
        //                     .setName("")
        //                     .setImage_Link("")
        //                     .setActive(false)
        //                     .setUploadedAt(null);

        Documents.push(newDoc);
        setCurrentDoc(newDoc);
        try {
            localStorage.setItem("product_descriptions", JSON.stringify(Documents));
        }
        catch {
            localStorage.clear()
        }
        setDocuments(Documents);
        return newDoc
    }

   
    const getFileName = (path) => {
        return path.replace(/^.*[\\/]/, '')
    }

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(file);
        });
        return {
          inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
      }

    function addImagesToDescription(description, images) {
        if (Array.isArray(images) ) {
                // Promise.all(
                    images.map((img) => {
                        
                        const obj = new Image()
                                        .setName(getFileName(img.name))
                                        .setImage_Link(img.name)
                                        .setActive(true)
                                        .setMimeType(img.type);
                        
                        fileToGenerativePart(img.file)
                            .then((data) => (obj.setBase64Rep(data)))
                    description.addImage(obj);
                    description.setChanged(true);
                })
            // )
        }
    }

    function Sync() {
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

    // useEwffect(() => {
    //     Sync();
    // })

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
        currentDocument,
        createDescription,
        addImagesToDescription,
        _set_documents,
    }

   return(
        <DocumentContext.Provider value={value}>
            {children}
        </DocumentContext.Provider>
    );
}
