
class Image {
    constructor() {
        this.ContainerId = "";
        this.Name = "";
        this.Image_Link = "";
        this.UploadedAt = "";
        this.Active = "";
        this.Base64 = "";
        this.ShouldBeDeleted = false;
        this.Changed = false;
        this.MimeType = "";
        this.downloadeableUrl = ""
    }

    getName() {
        return this.Name;
    }

    getImage_Link() {
        return this.Image_Link;
    }

    getUploadedAt() {
        return this.UploadedAt;
    }

    getActive() {
        return this.Active;
    }

    setName(name) {
        this.Name = name;
        return this;
    }

    setImage_Link(lnk) {
        this.Image_Link = lnk;
        return this;
    }

    setActive(active) {
        this.Active = active;
        return this;
    }

    setUploadedAt(date) {
        this.UploadedAt = date;
        return this;
    }

    setBase64Rep(b64) {
        this.Base64 = b64;
        return this;
    }

    getBase64Rep() {
        return this.Base64;
    }
    

    setCntId(id) {
        this.ContainerId = id;
        return this;
    }

    getCntId() {
        return this.ContainerId;
    }

    setMimeType(t) {
        this.MimeType = t;
        return this;
    }

    getMimeType() {
        return this.MimeType;
    }

    setChanged(b) {
        this.Changed = b;
        return this;
    }

    getChanged() {
        return this.Changed;
    }

    setDownloadable(url) {
        this.downloadeableUrl = url;
        return this;
    }

    getDownloadable() {
        return this.downloadeableUrl;
    }
}

export default Image;