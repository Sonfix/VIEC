
class ProductDescription {

    constructor() {
        this.User = null;
        this.Category = null;
        this.Prompt = null;
        this.CreatedAt = null;
        this.Images = [];
        this.Descriptions = [];
        this.Changed = false;
        
        return this;
    }

    getUser() {
        return this.User;
    }

    getCategory() {
        return this.Category;
    }

    getPrompt() {
        return this.Prompt;
    }

    setUser(usr) {
        this.User = usr;
        return this;
    }

    setCategory(cat) {
        this.Category = cat;
        return this;
    }
    
    setPrompt(prmpt) {
        this.Prompt = prmpt;
        return this;
    }

    addImage(img) {
        this.Images.push(img);
        return this;
    }

    addDescription(desc) {
        this.Descriptions.push(desc);
        return desc;
    }

    setChanged(changed) {

    }
}