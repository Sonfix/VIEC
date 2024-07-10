import React, { useContext, useState, useEffect } from "react"
import { GoogleGenerativeAI} from "@google/generative-ai"

const GenerationContext = React.createContext()

export function useGeneration() {
  return useContext(GenerationContext)
}


export function GenerationProvider({ children }) {
    
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState("")
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
         
    // Converts a File object to a GoogleGenerativeAI.Part object.
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
    
    async function run(images) {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      setLoading(true)
    
      const prompt = 
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
     
      console.log(images)   
      const imageParts = await Promise.all(
        Array.from(images).map(fileToGenerativePart)
      );
        
      
      console.log(imageParts) 
      setResponse(""); 
      const result = await model.generateContentStream([prompt, imageParts]);
      
      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        try {
          console.log(text)
          setResponse(JSON.parse(text));
        }
        catch {
          console.log(text)
        }
      }
      setLoading(false)
      // console.log(text)
    }
    
    
    const value = {
      run,
      response
    }

    return (
      <GenerationContext.Provider value={value}>
        {children}
      </GenerationContext.Provider>
    )
  }