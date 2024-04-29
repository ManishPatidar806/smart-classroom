import { createContext, useState } from "react";
import runChat from "../config/chat-bot.js";

export const Context = createContext();

const ContextProvider = (props)=>{

    const[input,setinput] = useState("");
    const[recentPrompt,setrecentPrompt] = useState("");
    const[prevPrompts,setprevPrompts] = useState([]);
    const[showResult,setshowResult] = useState(false);
    const[loading,setloading] = useState(false);
    const[resultData,setresultData] = useState("");

    const delayPara=(index , nextword) => {
        setTimeout(function(){
            setresultData(prev=>prev+nextword);
        },200*index)
    }

    const newchat = ()=>{
        setloading(false)
        setshowResult(false)
    }
    const onSent = async (prompt) =>{
       setresultData("")
       setloading(true)
       setshowResult(true)
       let response;
       if(prompt!==undefined){
        response = await runChat(prompt);
        setrecentPrompt(prompt)
        }else{
            setprevPrompts(prev=>[...prev,input])
            setrecentPrompt(input); 
             response = await runChat(input)
        }
        console.log(response);
        setresultData(response);

        let responseArray = response.split("\n");
        for(let i=0;i<responseArray.length;i++){
            const nextword = responseArray[i]+"\n";
            delayPara(i,nextword+" ");
        }
       setloading(false)
       setinput("")
    }
    
    const contextValue = {
            prevPrompts,
            setprevPrompts,
            onSent,
            setrecentPrompt,
            recentPrompt,
            showResult,
            loading,
            resultData,
            input,
            setinput,
            newchat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}
export default ContextProvider