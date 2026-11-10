import { useState } from "react";

export function Adivina(){
    const [seleccion, setSeleccion] = useState("")
    const [resultado, setResultado] = useState("")
    const [colorResultado, setColorResultado] = useState("")
    const [ganadas, setGanadas] = useState(0)
    const [perdidas, setPerdidas] = useState(0)
    const [partidas, setPartidas] = useState(0)

    function sortear(){
        const ganador = Math.floor(Math.random() * 10) + 1
        const elegido = Number(seleccion)
        
        setPartidas(partidas + 1)

        if (seleccion === " " ){
            setResultado("Ingresá un número")
            setColorResultado("red")
            return
        }
        if (elegido < 1 || elegido > 10){
            setResultado("Ingresá un número entre 1 y 10")
            setColorResultado("red")
            return
        }
        if (elegido === ganador){
            setResultado(`Ganaste. Salió ${ganador} y elegiste ${elegido}`)
            setColorResultado("green")
            setGanadas(ganadas + 1)
        } else {
            setResultado(`Perdiste. Salió ${ganador} y elegiste ${elegido}`)
            setColorResultado("red")
            setPerdidas(perdidas + 1)
        }
    }
    return (
        <>
        <h2>Adiviná el número</h2>
        <input type="number" value={seleccion} 
        onChange={(e) => setSeleccion(e.target.value)}/>
        <button onClick={sortear}>Adivinar</button>
        <p style={{ color: colorResultado}}>{resultado}</p>
        <hr />
        <p>Partidas jugadas: {partidas}</p>
        <p>Ganadas: {ganadas}</p>
        <p>Perdidas: {perdidas}</p>
        </>
    )
}