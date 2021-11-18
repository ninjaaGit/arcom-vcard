import React from 'react';
import './App.scss';
import {IndexContext} from '../src/context/index'
import QRCodeCanvas from './QRCodeCanvas';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {ReactComponent as DownloadSVG} from './SVGs/download.svg'
import {ReactComponent as LogoSVG} from './SVGs/logo.svg'

function App() {

  const { setNome, setEmail, setNumero, handleSave, vcard} = React.useContext(IndexContext);

  return (
    <div className="QRCodeDivAll">
        <div className="QRCodeDivInput">
            <LogoSVG/>
            <Input color="success" className="QRCodeInput" value={localStorage.getItem('nome')} id="QRNome" placeholder="Nome" onChange={(element) => setNome(element.target.value)}></Input>
            <Input color="success" className="QRCodeInput" value={localStorage.getItem('email')} type="email" id="QREmail" placeholder="Email" onChange={(element) => setEmail(element.target.value)}></Input>
            <Input color="success" className="QRCodeInput" value={localStorage.getItem('numero')} type="number" id="QRNumero" placeholder="Celular" onChange={(element) => setNumero(element.target.value)}></Input>
        </div>
        <div className="QRCodeDivContainerPai">
          <div className="QRCodeDivContainer">
            <div id="dados" className="QRCodeDiv">
                <LogoSVG className="QRCodeImage"/>
                <QRCodeCanvas text={vcard}></QRCodeCanvas>
                <h1 className="QRCodeNome">{localStorage.getItem('nome') || "Seu Nome"}</h1>
            </div>
            <Button color="success" onClick={handleSave}>
              DOWNLOAD
              <DownloadSVG/>
            </Button>
          </div>
        </div>
    </div>
  );
}

export default App;
