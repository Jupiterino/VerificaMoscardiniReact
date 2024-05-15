import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
const[input, setInput] = useState[0];
const[newGame, setNewGame] = useState[false];
const[loading, setLoading] = useState[false];

const[rispTent, setRispTent] = useState();
const[rispID, setRispID] = useState();
const[rispNumTent, setRispNumTent] = useState();

function gestisciInput(e){
  setRispNumTent(e.target.value);
}

async function nuovaPartita(){
    setNewGame(true);
    const response = await fetch("http://localhost:8080/partita", {method: "POST", 
    headers: {"Content-Type": "application/json"}});
    const r = await response.json();
    setNewGame(false);
    setRispID(r.id);
  }


async function invio(){
    setLoading(true);
    const response = await fetch(`http://localhost:8080/partita/${rispID}`, 
    {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"numero": input})
    });
    const r = await response.json();
    setNewGame(false);
    setRispTent(r.numero);
    setRispTent(r.numero);
  }


  return (
    <div className="App">
      <h1>INDOVINA NUMERO</h1>
      <div><button onClick={(nuovaPartita)}>nuova pagina</button></div>
      { newGame &&
        <div>in caricamento ...</div>
      }
      { !newGame &&
        <div>
          <p>ID: {rispID}</p>
          <p>TENTATIVI: {rispNumTent}</p>

          <p>INSERISCI UN NUMERO DA 1 A 100</p>
          <input type = "number" value={input} onImput={gestisciInput}></input>
          <input type = "submit" onClick={invio} ></input>
        </div>
      }
      </div>
    
  );
}

export default App;
