
// const template =
//   {
//     Produktname: "Beispiel Produktname",
//     Titel: "Ein Aussagekräftiger, zum verkauf anregender Titel",
//     Beschreibung: "Dies ist eine detaillierte und SEO-optimierte Produktbeschreibung...",
//     Hauptmerkmale: ["Merkmal 1", "Merkmal 2", "Merkmal 3"],
//     Vorteile: ["Vorteil 1", "Vorteil 2"],
//     Materialien: "Hochwertiges Material XYZ",
//     Anwendungsbereiche: ["Bereich 1", "Bereich 2"],
//     Zielgruppe: "Zielgruppe XYZ",
//     Pflegehinweise: "Pflegehinweis XYZ",
//     Besonderheiten: "Besonderheit XYZ",
//     Tags: ["Tag1", "Tag2", "Tag3"]
//   };


// const keys = ["Titel", "Beschreibung", "Hauptmerkmale", "Besonderheiten", "Tags"]

class Description {
    constructor() {
        this.Value = "";
        this._RawText = "";
        this.Data = {}
        this.CreatedAt = null;
        this._StartPar = false;
        this._EndPar = false;
    }
    
    trimStr(str) {
        const startIndex = str.indexOf('{');
        const endIndex = str.lastIndexOf('}');
        // console.log('String: %s <startId: %d> <endId: %d>', str, startIndex, endIndex)
        
        if (startIndex !== -1) {
            this._StartPar = true;
            str = str.substring(startIndex, str.length);
        }
        if (endIndex !== -1) {
            this._EndPar = true;
            str = str.substring(0, endIndex+1)
        }
        else if (!this._StartPar || this._EndPar) return "";
        // console.log("After trimm: %s", str)
        return str; 
    }

    getValue() {
        return this.Value;
    }

    getText() {
        return this.trimStr(this._RawText);
    }

    getCreatedAt() {
        return this.CreatedAt;
    }

    setValue(val) {
        this.Value = val;
        return this;
    }

    // we'll upadte our internal data everytime we get a new chunk
    update() {
        // For future use: Will be used for live updates
    }

    addText(txt) {
        this._RawText += this.trimStr(txt);
        
        this.update();
        return this;
    }

    setCreatedAt(createdAt) {
        this.CreatedAt = createdAt;
        return this;
    }

    getData() {
        return this.Data;
    }

    getJSON() {
        try {
            return JSON.parse(this._RawText);
        }
        catch {
            return null;
        }
    }
}

class Tag {
    constructor() {
        this.Name = "";
        this.Value = "";
    }

    getName() {
        return this.Name;
    }

    getValue() {
        return this.Value;
    }

    setName(name) {
        this.Name = name;
        return this;
    }

    setValue(val) {
        this.Value = val;
        return this;
    }
}

export {
    Description,
    Tag,
}