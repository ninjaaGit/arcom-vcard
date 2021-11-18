import React, { createContext, useEffect, useState} from "react";
import domtoimage from 'dom-to-image';
export const IndexContext = createContext();


export default function IndexProvider({ children }) {
    const [text, setText] = useState("")
    const [nome, setNome] = useState(localStorage.getItem('nome'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [numero, setNumero] = useState(localStorage.getItem('numero'))

    localStorage.setItem('nome', nome)
    localStorage.setItem('email', email)
    localStorage.setItem('numero', numero)

    var nomeQR,
    element =  document.getElementById("QRNome")
    if(element != null) {
      nomeQR = element.value;
    }
    else {
      nomeQR = null;
    }

    var emailQR,
    element2 = document.getElementById("QREmail")
    if(element2 != null) {
      emailQR = element2.value;
    }
    else {
      emailQR = null
    }

    var numeroQR,
    element3 = document.getElementById("QRNumero")
    if(element3 != null) {
      numeroQR = element3.value;
    }
    else {
      numeroQR = null
    }

    var vcard_begin = 'BEGIN:VCARD\nVERSION:3.0\n';
    
    var vcard_end = 'END:VCARD;';
    
    var nomeV = 'FN:' + nomeQR + '\n';
    
    var nV = 'N:' + ";" + nomeQR + ";"  + '\n';

    var emailV = 'EMAIL:'+ emailQR + '\n';
    
    var telefoneV = 'TEL;TYPE=CELL:' + numeroQR + '\n';

    var orgV = 'ORG:' + "Arcom" + '\n';

    var urlV = 'URL;TYPE=WORK:' + "https://www.arcom.com.br" + '\n';

    var adrV = "ADR;TYPE=WORK:" + "Arcom - Anel Viario Ayrton Senna, 2001 - Distrito Industrial, Uberlandia - MG, 38402-329" + '\n'

    var vcard = vcard_begin+nomeV+nV+emailV+telefoneV+orgV+adrV+urlV+vcard_end;

    function handleSave() {
      var node = document.getElementById('dados');
      domtoimage.toPng(node).then(function (dataUrl) {
        var img = new Image();
        const link = document.createElement("a");
        var imgcomp = img.src = dataUrl;
        link.href = imgcomp
        link.setAttribute("download", "qrcode.png")
        link.click()
      })
      .catch(function (error) {
        console.error(error);
      });
    }

return (<IndexContext.Provider value={{text, setText, nome, setNome, email, setEmail, numero, setNumero, handleSave, vcard}}>
    {children}
  </IndexContext.Provider>);
}