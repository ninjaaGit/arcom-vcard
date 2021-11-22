import React, { createContext, useState} from "react";
import domtoimage from 'dom-to-image';
import { jsPDF } from "jspdf";
export const IndexContext = createContext();


export default function IndexProvider({ children }) {
    const [text, setText] = useState("")
    const [nome, setNome] = useState(localStorage.getItem('nome'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [numero, setNumero] = useState(localStorage.getItem('numero'))

    localStorage.setItem('nome', nome)
    localStorage.setItem('email', email)
    localStorage.setItem('numero', numero)

    if (nome === null) {
      setNome("")
    }
    if (email === null) {
      setEmail("")
    }
    if (numero === null) {
      setNumero("")
    }

    var vcard_begin = 'BEGIN:VCARD\nVERSION:3.0\n';
    
    var vcard_end = 'END:VCARD;';
    
    var nomeV = 'FN:' + nome + '\n';
    
    var nV = 'N:' + ";" + nome + ";"  + '\n';

    var emailV = 'EMAIL:'+ email + '\n';
    
    var telefoneV = 'TEL;TYPE=CELL:' + numero + '\n';

    var orgV = 'ORG:' + "Arcom" + '\n';

    var urlV = 'URL;TYPE=WORK:' + "https://www.arcom.com.br" + '\n';

    var adrV = "ADR;TYPE=WORK:" + "Arcom - Anel Viario Ayrton Senna, 2001 - Distrito Industrial, Uberlandia - MG, 38402-329" + '\n'

    var vcard = vcard_begin+nomeV+nV+emailV+telefoneV+orgV+adrV+urlV+vcard_end;

    function handleSave() {
      var node = document.getElementById('dados');
      var doc = new 
      domtoimage.toPng(node).then(function (dataUrl) {
        var img = new Image();
        var doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: [7.5, 5.8]
        });
        const link = document.createElement("a");
        var imgcomp = img.src = dataUrl;
        link.href = imgcomp
        doc.addImage(imgcomp, 'PNG', 1, 1)
        doc.save('vCard ' + localStorage.getItem('nome') + '.pdf')
        // link.setAttribute("download", "VCard " + localStorage.getItem('nome') + ".png")
        // link.click()
      })
      .catch(function (error) {
        console.error(error);
      });
    }

return (<IndexContext.Provider value={{text, setText, nome, setNome, email, setEmail, numero, setNumero, handleSave, vcard}}>
    {children}
  </IndexContext.Provider>);
}