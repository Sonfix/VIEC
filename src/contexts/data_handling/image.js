
class Image {
    constructor() {
        this.Name = "";
        this.Image_Link = "";
        this.UploadedAt = "";
        this.Active = "";
        this.ShouldBeDeleted = false;
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
}