import React, { useContext, useState, useEffect } from "react"

const GenerationContext = React.createContext()

export function GenerationProvider({ children }) {
    
    const [loading, setLoading] = useState(true)
    
    const value = {
    
    }

    return (
      <GenerationContext.Provider value={value}>
        {!loading && children}
      </GenerationContext.Provider>
    )
  }