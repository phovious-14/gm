import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../contexts/WalletContext';

function Nft(){
  const [nftLink , setLink] = useState();
  const {walletAddress} = useContext(WalletContext)

  function filter(text){
    if(text.substring(0,7) == "ipfs://"){
      return ("https://w3s.link/ipfs/" + text.substring(7,text.length))
    }
    else{
      return text 
    }
  }

  //This function will fetch nft associated with wallet address
  function fetchNft(){
    axios.get(`https://polygon-mainnet.g.alchemy.com/nft/v2/tWfzgDK4rYavJBX5syU_uOrlfraPJUCF/getNFTs/?owner=${walletAddress}`)
      .then((data)=>{
          setLink(data.data.ownedNfts);
      })
  }

  useEffect(() => {
    fetchNft();
  }, []);
  

  return(
    <div className='nft_container' id="style-4">
      {nftLink && nftLink.map((data) =>(
        <div className='nft'>
          <iframe src={filter(data.media[0].raw)} scrolling='no' marginHeight="0" marginWidth="0" allowfullscreen></iframe>
        </div>
      ))}
    </div>
  );

}

export default Nft;