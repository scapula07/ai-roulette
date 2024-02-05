import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ai from "./assets/aihead.webp"
import human from "./assets/head.png"
import OpenAI from "openai";
import axios from 'axios';
import Connect from './connect'
import Web3 from "web3";
import abiQrng from "./abi.json"

import { ethers } from 'ethers'

const qrng="0x51246c9F480Cc6A46397b2A35684BC3231Acf41F"

function App() {
  
  const web3 = new Web3(window.ethereum)
  const [count, setCount] = useState(0)
  const [chosenn,setChosen]=useState(false)
  const [aiNum,setAi]=useState(0)
  const [userNum,setUser]=useState(0)
  const [account,setAccount]=useState()  

  const qrngContract = new web3.eth.Contract(
    abiQrng,
    qrng
  )


const aiTurn = async () => {


  const OPENAI_API_KEY = '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'; // Replace with your actual OpenAI API key
  
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: 'Generate an integer between 0 to 9, dont attach any text to the result.I need only the number',
      },
    ],
  };
  
  axios.post(apiUrl, requestData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
  })
    .then(response => {
      console.log(response.data?.choices[0]?.message?.content);
      setAi(response.data?.choices[0]?.message?.content)
      setChosen(false)
    })
    .catch(error => {
      console.error('Error:', error.response ? error.response.data : error.message);
    });
  
};

chosenn&&aiTurn()


const userTurn=async()=>{
   
    const txs = await qrngContract.methods.makeRequestUint256().send({from:account})
    const num = await qrngContract.methods.endpointIdUint256().call({})
    console.log(num,"num")
    setChosen(true)

}

  
  return (
    <div className='w-full h-screen px-8 py-20 flex flex-col items-center' style={{background:"#00052a"}}>
            <div className='w-full flex items-center justify-center space-x-10'>
                 <h5 className='text-5xl font-semibold text-white'>Roulette</h5>

                 <Connect 
                    account={account}
                    setAccount={setAccount}
                 />

            </div>
           <div className='flex w-4/5'>
                  <div className='w-2/5 flex flex-col'>
                          <img 
                             src={human}
                             className="h-44 w-44"
                          />

                          <div className='flex flex-col space-y-6 w-1/2'>
                               <input
                                 className='border rounded-lg py-1 px-8 text-white'
                                 placeholder='Enter a number'
                                 style={{background:"#00052a"}}
                                 type="number"
                                />
                               <button className='bg-white py-1 rounded-lg'
                                 onClick={userTurn}
                               >
                                  Spin

                               </button>

                          </div>

                  </div>

                  <div className='w-1/5 flex flex-col'>
                    
                  </div>

                  <div className='w-2/5 flex flex-col items-center'>
                            <img 
                             src={ai}
                             className="h-44 w-44"
                          />

                          <h5 className='text-white text-2xl'>I choose :{aiNum}</h5>

                    
                  </div>


           </div>
           
    </div>


  )
}

export default App
