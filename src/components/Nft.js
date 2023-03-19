import axios from 'axios';
import { useEffect, useState } from 'react';

function Nft(){
  const [nftLink , setLink] = useState();

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
    axios.get(`https://polygon-mainnet.g.alchemy.com/nft/v2/tWfzgDK4rYavJBX5syU_uOrlfraPJUCF/getNFTs/?owner=0xc91a35AF656EA0329aEbB38fc618c4177b96142c`)
      .then((data)=>{
          setLink(data.data.ownedNfts);
      })
  }

  useEffect(() => {
    fetchNft();
  }, []);
  

  return(
    <div className='nft-show'>
      {nftLink && nftLink.map((data) =>(
      <>
        <h2 id="links">{data.title}</h2>
        <iframe src={filter(data.media[0].raw)}> </iframe>
      </>
      ))}
    </div>
  );

}

export default Nft;