import React,{useEffect, useState,useCallback} from 'react'

import Web3 from "web3";


import { ethers } from 'ethers'

const qrng="0x51246c9F480Cc6A46397b2A35684BC3231Acf41F"

export default function Connect({account,setAccount}) {
      


    const web3 = new Web3(window.ethereum)

 





    
    
      const connectWallet=async()=>{
        console.log("connecting")
      try{
 
         const provider = new ethers.providers.Web3Provider(window.ethereum)
          console.log(provider)

          await provider.send("eth_requestAccounts", []);
          
           const newsigner = provider.getSigner()
          
         
         const account= await newsigner.getAddress()

         setAccount(account)
       



         }catch(error){
        //    if(error.code === 4001) {
      
        //     } else {
        //       console.error(error);
        //    }
       }
   }


  return (
     <button className='text-white bg-red-600 rounnded-lg px-6 py-2' onClick={connectWallet}>
        {account?.length>0?
            "Connected"
             :
           "Connect wallet"

        }
     
     </button>
  )
}