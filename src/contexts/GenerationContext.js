import React, { useContext, useState, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

const GenerationContext = React.createContext()

export function GenerationProvider({ children }) {
    
    const [loading, setLoading] = useState(true)
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

    // Converts local file information to a GoogleGenerativeAI.Part object.
    function fileToGenerativePart(file, mimeType) {
      return {
        inlineData: {
          data: Buffer.from(file).toString("base64"),
          mimeType
        },
      };
    }
    
    async function run() {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
    
      const imageParts = [
        fileToGenerativePart("image1.png", "image/png"),
        fileToGenerativePart("image2.jpeg", "image/jpeg"),
      ];
    
      const result = await model.generateContentStream([prompt, ...imageParts]);
      
      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        // text += chunkText;
      }
      setLoading(false)
    }
    
    run();
    
    const value = {
    
    }

    return (
      <GenerationContext.Provider value={value}>
        {!loading && children}
      </GenerationContext.Provider>
    )
  }