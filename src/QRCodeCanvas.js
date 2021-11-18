import React, { useRef, useEffect } from "react";
import {IndexContext} from '../src/context/index'
import QRCode from "qrcode";

export default function QRCodeCanvas({text}) {
    const canvasRef = useRef()    

    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, text,{width: 300}, (error) => {
            console.log(error)
        })
      },[text])

    return(
            <canvas ref={canvasRef} id="canvas"/>
    )
}