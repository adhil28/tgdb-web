import CryptoJs from 'crypto-js';

const secretKey = '(@)(H(#H(()#J()(J_)nc0&&%%GVVHGUS^S^^#*Uchchsfds453484583448765dsf4ds48fghyh(()(*()9239090ndsds'


export const save = async (key: string, text: string) => {
    let encryptedText = await encrypt(text)
    localStorage.setItem(key, encryptedText);
}

export const getItem = async (key: string)   => {
    let chipperText = localStorage.getItem(key)
    if (chipperText != null) {
        let decryptedText = await decrypt(chipperText)
        return decryptedText
    }
    return chipperText;
}



const encrypt = (text: string): Promise<string> => {
    return new Promise((res) => {
        let ciphertext = CryptoJs.AES.encrypt(text, secretKey);
        res(ciphertext.toString())
    })
}

const decrypt = (ciphertext: string) => {
    return new Promise((res) => {
        var bytes = CryptoJs.AES.decrypt(ciphertext.toString(), secretKey);
        var plaintext = bytes.toString(CryptoJs.enc.Utf8);
        res(plaintext)
    })
}