import React, { useContext, useState, useEffect } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useSendMessage from "../hooks/useSendMessage";
import Header from "./Header/Header";
import CardHeader from "./CardHeader";
import MessageComposer from "./MessageComposer";
import AddressInput from "./AddressInput";
import BackButton from "./BackButton";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../hooks/useStreamConversations";
import {sendToken} from './Payment';
import Nft from "./Nft";
import { WalletContext } from "../contexts/WalletContext";

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const {selectedConvo, setLinkToSend, linkToSend} = useContext(WalletContext)
  const { convoMessages, client } = providerState;
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);

  const sendNewMessage = async () => {
    if("/pay" === msgTxt.substring(0,4)){
      sendToken(msgTxt).then((data) => {
        sendMessage("Hey, I paid you " + msgTxt.split(" ")[1] + "  " +msgTxt.split(" ")[2]);
        sendMessage("Transaction :  https://goerli.etherscan.io/tx/"+data)
        setMsgTxt("");
      });
      
    }
    else{
      sendMessage(msgTxt);
      setMsgTxt("");
    }
    
  };

  useEffect(()=>{
    if(linkToSend){
      setMsgTxt(linkToSend);
      setLinkToSend("");
    }
  })

  return (
    <div className="flex align-center flex-dir-col home">
      {client && (
        <div className="card cont">
          {!selectedConvo && !isNewMsg ? (
            <>
              
            </>
          ) : (
            <>
              <p className="addr"><i class='bx bx-user-circle fa fa-2x' ></i> {selectedConvo}</p>
              <MessageList
                isNewMsg={isNewMsg}
                convoMessages={convoMessages.get(selectedConvo) ?? []}
                selectedConvo={selectedConvo}
              />
              <MessageComposer
                msgTxt={msgTxt}
                setMsgTxt={setMsgTxt}
                sendNewMessage={sendNewMessage}
                sendMessage={sendMessage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
