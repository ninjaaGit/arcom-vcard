import React  from 'react';
import './App.scss';
import {IndexContext} from '../src/context/index'
import QRCodeCanvas from './QRCodeCanvas';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {WhatsappShareButton} from "react-share";
import {WhatsappIcon} from "react-share";
import jSuites from "jsuites";
import {ReactComponent as DownloadSVG} from './SVGs/download.svg'
import {ReactComponent as ShareSVG} from './SVGs/share.svg'
import {ReactComponent as LogoSVG} from './SVGs/logo.svg'

function App() {
  const { setNome, setEmail, setNumero, setCargo, setFixo, handleSave, handleShare, vcard, isMobile, imgcomp} = React.useContext(IndexContext);  
  
  return (
    <div className="QRCodeDivAll">
        <div className="QRCodeDivInput">
            <LogoSVG/>
            <Input color="success" disableUnderline="true" className="QRCodeInput" value={localStorage.getItem('nome')} id="QRNome" placeholder="Nome" onChange={(element) => setNome(element.target.value)}></Input>
            <Input color="success" disableUnderline="true" className="QRCodeInput" value={localStorage.getItem('email')} type="email" id="QREmail" placeholder="Email" onChange={(element) => setEmail(element.target.value)}></Input>
            <Input color="success" disableUnderline="true" className="QRCodeInput" value={localStorage.getItem('cargo')} id="QRCargo" placeholder="Cargo" onChange={(element) => setCargo(element.target.value)}></Input>
            <input color="success" data-mask='(00) 00000-0000' maxLength="15" className="QRCodeInput" value={localStorage.getItem('numero')} type="tel" id="QRNumero" placeholder="Celular" onChange={(element) => setNumero(element.target.value)}></input>
            <input color="success" data-mask='(00) 0000-0000' maxLength="14" className="QRCodeInput" value={localStorage.getItem('fixo')} type="tel" id="QRFixo" placeholder="Fixo (Opcional)" onChange={(element) => setFixo(element.target.value)}></input>
        </div>
        <div className="QRCodeDivContainerPai">
          <div className="QRCodeDivContainer">
            <div id="dados" className="QRCodeDiv">
                <LogoSVG className="QRCodeImage"/>
                <QRCodeCanvas text={vcard}></QRCodeCanvas>
                <h1 className="QRCodeNome">{localStorage.getItem('nome') || "Seu Nome"}</h1>
            </div>
            {isMobile ?
                <Button color="success" onClick={handleShare}>
                  COMPARTILHAR 
                  <ShareSVG/>
                </Button>:
              <Button color="success" onClick={handleSave}>
                DOWNLOAD
                <DownloadSVG/>
              </Button>
            }
          </div>
        </div>
    </div>
  );
}

export default App;
