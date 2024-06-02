import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import "./Sidebar.css"
import { Context } from '../../context/Context';

function Sidebar() {
    const [extend,setExtend] = useState(false);
    const menuClick = ()=>{
        setExtend(prev => !prev);
    }
    const loadPrompt = async (prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt);
    }

    const {prevPrompt, setPrevPrompts, onSent,setRecentPrompt, newChat} = useContext(Context)

  return (
    <div className='sidebar' style={{ transition: "1.5s ease-in-out" }}>
        <div className="top">
            <img onClick={menuClick} className={`menu`} src={assets.menu_icon} alt="" />
            <div onClick={newChat} className="new-chat">
                <img  className="plus" src={assets.plus_icon} alt="" />
                {extend ? <p>New Chat</p> : null}
            </div>
            {extend ?  
            <div className="recent" >
                <p className="recent-title">Recent</p>
                {prevPrompt.map((item)=>{
                    return (<div onClick={()=>loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)}...</p> 
                </div>)
                })}
                
            </div> : null}
        </div> 
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extend ? <p>Help</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extend ? <p>Activity</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extend ? <p>Settting</p> : null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar
