import React, {useEffect, useState} from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"


const App = () => {

const [model, setModel] = useState(null)
const [labels, setLabels] = useState(null) 
const [numberOne, setNumberOne] = useState(null)
const [numberTwo, setNumberTwo] = useState(null)
const [ans, setAns] = useState(null)


const loadModel = async () =>{
  const recognizer = await speech.create("BROWSER_FFT")
  console.log('Model Loaded')
  await recognizer.ensureModelLoaded();
  console.log(recognizer.wordLabels())
  setModel(recognizer)
  setLabels(recognizer.wordLabels())
}

useEffect(()=>{loadModel()}, []); 

function argMax(arr){
  return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const recognizeCommands = async () =>{
  console.log('Listening for commands')
  model.listen(result=>{
    console.log(labels[argMax(Object.values(result.scores))])
    console.log(labels[argMax(Object.values(result.scores))])
    if (labels[argMax(Object.values(result.scores))] === "go") {
      const answer = numberOne + numberTwo;
      setAns(answer)
    }
  }, {includeSpectrogram:true, probabilityThreshold:0.9})
  setTimeout(()=>model.stopListening(), 10e3)
}

const numberOneEnter = () => {
  console.log('Listening for commands')
  model.listen(result=>{
    console.log(labels[argMax(Object.values(result.scores))])
    switch (labels[argMax(Object.values(result.scores))]) {
      case "zero":
        setNumberOne(0)
        break;
      case "one":
        setNumberOne(1)
        break;
      case "two":
        setNumberOne(2)
        break;
      case "three":
        setNumberOne(3)
        break;
      case "four":
        setNumberOne(4)
        break;
      case "five":
        setNumberOne(5)
        break;
      case "six":
        setNumberOne(6)
        break;
      case "seven":
        setNumberOne(7)
        break;
      case "eight":
        setNumberOne(8)
        break;
      case "nine":
        setNumberOne(9)
        break;
      default:
        setNumberOne(0)
    }
  }, {includeSpectrogram:true, probabilityThreshold:0.9})
  setTimeout(()=>model.stopListening(), 10e3)
}

const numberTwoEnter = () => {
  console.log('Listening for commands')
  model.listen(result=>{
    console.log(labels[argMax(Object.values(result.scores))])
    switch (labels[argMax(Object.values(result.scores))]) {
      case "zero":
        setNumberTwo(0)
        break;
      case "one":
        setNumberTwo(1)
        break;
      case "two":
        setNumberTwo(2)
        break;
      case "three":
        setNumberTwo(3)
        break;
      case "four":
        setNumberTwo(4)
        break;
      case "five":
        setNumberTwo(5)
        break;
      case "six":
        setNumberTwo(6)
        break;
      case "seven":
        setNumberTwo(7)
        break;
      case "eight":
        setNumberTwo(8)
        break;
      case "nine":
        setNumberTwo(9)
        break;
      default:
        setNumberTwo(0)
    }
  }, {includeSpectrogram:true, probabilityThreshold:0.9})
  setTimeout(()=>model.stopListening(), 10e3)
}

  return (
    <div className="App">
      <header className="App-header">
          <div>
            <button onClick={()=>{
              numberOneEnter();
            }}>First Number</button>
            {numberOne !== null ? <p>{numberOne}</p> : ''}
          </div>
          <div>
            <button onClick={()=>{
              numberTwoEnter()
            }}>Second Number</button>
            {numberTwo !== null ? <p>{numberTwo}</p> : ''}
          </div>
          <div>
            <button onClick={()=>{recognizeCommands()}}>Add two numbers</button>
          </div>
          {<p>Answer is: {ans}</p>}
      </header>
    </div>
  );
}

export default App;