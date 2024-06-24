import CryptoJS from "crypto-js"

function GetKey(currentUser) {
    let nonce = process.env.REACT_APP_SECRET
    let key = CryptoJS.SHA256(nonce + currentUser.uid).toString(CryptoJS.enc.Hex);

    return key
}

export function Encrypt(data, user) {
    var crypted = CryptoJS.AES.encrypt(JSON.stringify(data), GetKey(user)).toString();

    return crypted

}

export function Decrypt(data, user) {
    if (!data)
     return data;
    var bytes  = CryptoJS.AES.decrypt(data, GetKey(user));
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData
}