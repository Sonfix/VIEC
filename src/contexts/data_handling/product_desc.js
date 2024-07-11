
class ProductDescription {

    constructor() {
        this.ContainerId = "";
        this.User = null;
        this.Category = null;
        this.Prompt = null;
        this.CreatedAt = null;
        this.Images = [];
        this.Descriptions = {};
        this.Response = [];
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

    setImages(imgs) {
        this.Images = imgs;
        return this;
    }

    addDescription(key, value) {
        this.Descriptions[key] = value
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

    getDescription(key) {
        if (key in this.Descriptions) {
            return this.Descriptions.key;
        }
        return null;
    }

    getDescriptionAsString() {
        return JSON.stringify(this.Descriptions);
    }

    updateDescription(key, value) {
        if (key in this.Descriptions) {
            this.Descriptions.key = value;
        }
        return this;
    }

    addResponse(resp) {
        this.Response.push(resp);
        return this;
    }

    getResponses() {
        return this.Response;
    }

    getPlainRespsones() {
        return this.Response.map((desc) => {
            return desc.getText();
        })
    }

    getLatestResponse() {
        if (this.Response[this.Response.length - 1]) {
            return this.Response[this.Response.length - 1];
        }
        else {
            return null;
        }
    }
}

export default ProductDescription