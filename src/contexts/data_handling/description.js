
class Description {
    constructor() {
        this.Value = "";
        this.Text = "";
        this.CreatedAt = null;
    }

    getValue() {
        return this.Value;
    }

    getText() {
        return this.Text;
    }

    getCreatedAt() {
        return this.CreatedAt;
    }

    setValue(val) {
        this.Value = val;
        return this;
    }

    setText(txt) {
        this.Text = txt;
        return this;
    }

    setCreatedAt(createdAt) {
        this.CreatedAt = createdAt;
        return this;
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