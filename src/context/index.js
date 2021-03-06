import React, { createContext, useState, useEffect} from "react";
import domtoimage from 'dom-to-image';
import { jsPDF } from "jspdf";
export const IndexContext = createContext();


export default function IndexProvider({ children }) {
    const [text, setText] = useState("")
    const [nome, setNome] = useState(localStorage.getItem('nome'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [numero, setNumero] = useState(localStorage.getItem('numero'))
    const [fixo, setFixo] = useState(localStorage.getItem('fixo'))
    const [cargo, setCargo] = useState(localStorage.getItem('cargo'))
    const [isMobile, setIsMobile] = React.useState(false)
    const [isVendas, setIsVendas] = React.useState(false)
    

    localStorage.setItem('nome', nome)
    localStorage.setItem('email', email)
    localStorage.setItem('numero', numero)
    localStorage.setItem('fixo', fixo)
    
    if (isVendas == false) {
      localStorage.setItem('cargo', cargo)
    }
    if (nome === null) {
      setNome("")
    }
    if (email === null) {
      setEmail("")
    }
    if (numero === null) {
      setNumero("")
    }
    if (fixo === null) {
      setFixo("")
    }
    if (cargo === null) {
      setCargo("")
    }

    useEffect(() => {      
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    })
    
    useEffect(() => {      
      if (current.includes("?setor")) {
        setIsVendas(true)
      } else {
        setIsVendas(false)
      }
    },[])

    var vcard_begin = 'BEGIN:VCARD\nVERSION:3.0\n';
    
    var vcard_end = 'END:VCARD;';
    
    var nomeV = 'FN:' + nome + '\n';
    
    var nV = 'N:' + ";" + nome + ";"  + '\n';

    var emailV = 'EMAIL:'+ email + '\n';
    
    var telefoneV = 'TEL;TYPE=CELL:' + numero + '\n';

    var fixoV = 'TEL;TYPE=HOME:' + fixo + '\n';

    var orgV = 'ORG:' + "Arcom" + '\n';

    var roleV = 'TITLE:' + cargo + '\n';

    var urlV = 'URL;TYPE=WORK:' + "https://www.arcom.com.br" + '\n';

    var adrV = "ADR;TYPE=WORK:" + 'Arcom - Anel Viario Ayrton Senna, 2001 - Distrito Industrial, Uberl??ndia - MG 38402-329' + '\n'

    var vcard = vcard_begin+nomeV+nV+emailV+telefoneV+fixoV+orgV+roleV+adrV+urlV+vcard_end;

    var imgcomp = ''

    var current = window.location.search

    function handleSave() {
      var node = document.getElementById('dados');
      domtoimage.toPng(node).then(function (dataUrl) {
        var img = new Image();
        var doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: [7.5, 5.8]
        });
        const link = document.createElement("a");
        imgcomp = img.src = dataUrl;
        link.href = imgcomp
        doc.addImage(imgcomp, 'PNG', 1, 1)
        localStorage.setItem('img', imgcomp)
        doc.save('vCard ' + localStorage.getItem('nome') + '.pdf')
        // link.setAttribute("download", "VCard " + localStorage.getItem('nome') + ".png")
        // link.click()
      })
      .catch(function (error) {
        console.error(error);
      });
    }

    function handleShare(){
      var node = document.getElementById('dados');
      domtoimage.toBlob(node).then(function (dataUrl) {
        const filesArray = [
          new File(
            [dataUrl],
            'test.jpg',
            {
              type: "image/jpeg",
            }
          )
        ];
        navigator.share({
          text: 'vCard de ' + nome,
          files: filesArray
        })
        })
    }

return (<IndexContext.Provider value={{text, setText, nome, setNome, email, setEmail, numero, setNumero, cargo, setCargo, fixo, setFixo, handleSave, handleShare, vcard, isMobile, imgcomp,isVendas}}>
          {children}
        </IndexContext.Provider>
       );
}