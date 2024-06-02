import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompt,setPrevPrompts] = useState([])
    const [showResult,setShowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [resultData,setResultData] = useState("")

    const delayPara = (index,nextWord) => {
        setTimeout(() => {
            setResultData(prev=>prev+nextWord);
        }, 75*index);
    }

    const newChat = ()=>{
        setShowResult(false);
        setLoading(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let res;
        if(prompt!==undefined){
            setRecentPrompt(prompt);
            res = await run(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            res = await run(input);
        }

        let responseArray = res.split("**");
        let response = "";
        for(let i=0; i<responseArray.length; i++){
            if(i%2===0){
                response+=responseArray[i]
            }
            else{
                response+= "<b>" + responseArray[i] + "</b>"
            }
        }
        response=response.split("*").join( "<br>")

        const finalResponseArray = response.split(" ");
        for(let i=0; i<finalResponseArray.length; i++){
            delayPara(i,finalResponseArray[i]+" ");
        }
        
        setLoading(false);
        setInput("")
    }

    const contextValue = {
        input,
        setInput,
        prevPrompt,
        setPrevPrompts,
        onSent,
        loading,
        resultData,
        showResult,
        recentPrompt,
        setRecentPrompt,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider