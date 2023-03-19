import React, { useContext, useState } from "react";
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
  const {selectedConvo, setSelectedConvo} = useContext(WalletContext)
  const { convoMessages, client } = providerState;
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setSelectedConvo(null);
    setIsNewMsg(false);
    setErrorMsg("");
    setMsgTxt("");
  };

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = async (newAddress) => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid address");
    } else {
      const isOnNetwork = await checkIfOnNetwork(newAddress)
      if (!isOnNetwork) {
        setErrorMsg("Address not on XMTP network");
      } else {
        setSelectedConvo(newAddress);
        setErrorMsg("");
      }
    }
  };

  const sendNewMessage = async () => {
    if("/pay" == msgTxt.substring(0,4)){
      sendToken(msgTxt);
      sendMessage("Hey Check I sent you " + msgTxt.split(" ")[2] + "  " +msgTxt.split(" ")[1]);
      setMsgTxt("");
    }
    else if("/nft" == msgTxt.substring(0,4)){ 
      //write what msg to send

    }
    else{
      sendMessage(msgTxt);
      setMsgTxt("");
    }
    
  };

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
