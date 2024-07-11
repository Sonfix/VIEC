
class ProductDescription {

    constructor() {
        this.ContainerId = "";
        this.User = null;
        this.Category = null;
        this.Prompt = null;
        this.CreatedAt = null;
        this.Images = [];
        this.Descriptions = [];
        this.Changed = false;
        this.ToDelete = false;
    }

    getCntId() {
        return this.ContainerId;
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

    getImages() {
        return this.Images;
    }

    addDescription(desc) {
        this.Descriptions.push(desc);
        return this;
    }

    setChanged(changed) {
        this.Changed = changed;
        return this
    }

    getChanged() {
        return this.Changed
    }

    setCntId(id) {
        this.ContainerId = id;
        return this;
    }

    setToDelete(b) {
        this.ToDelete = b;
        return this;
    }

    getToDelete() {
        return this.ToDelete;
    }

    setCreatedAt(ts) {
        this.CreatedAt = ts;
        return this;
    }

    getCreatedAt() {
        return this.CreatedAt;
    }
}

export default ProductDescription