import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { useEffect, useRef, useState } from 'react';
import { sendMsgToOpenAI } from './openai';


function App() {
    const msgEnd = useRef(null);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            text: "Hi, I am ChatGPT, a state-of-the-art language model developed by OpenAI. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek information, or even request assistance with various tasks. Just let me know how I can help you!",
            isBot: true,
        }
    ]);

    useEffect(() => {
        msgEnd.current.scrollIntoView();
    }, [messages]);

    const handleSend = async () => {
        const text = input;
        setInput('');
        setMessages([
            ...messages,
            { text, isBot: false }
        ]);
        const res = await sendMsgToOpenAI(text);
        setMessages([
            ...messages,
            { text, isBot: false },
            { text: res, isBot: true }
        ]);
    }

    const handleEnter = async (e) => {
        if (e.key === 'Enter') await handleSend();
    }

    const handleQuery = async (e) => {
        const text = e.target.value;
        setMessages([
            ...messages,
            { text, isBot: false }
        ]);
        const res = await sendMsgToOpenAI(text);
        setMessages([
            ...messages,
            { text, isBot: false },
            { text: res, isBot: true }
        ]);

    }

    return (
        <div className="App">
            <div className="sideBar">
                <div className="upperSide">
                    <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
                    <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
                    <div className="upperSideBottom">
                        <button className="query" onClick={handleQuery} value={"Where should I go on holiday?"}><img src={msgIcon} alt="Query" />Where should I go on holiday?</button>
                        <button className="query" onClick={handleQuery} value={"How do I find the area of a square?"}><img src={msgIcon} alt="Query" />How do I find the area of a square?</button>
                        <button className="query" onClick={handleQuery} value={"What's the weather like in Portugal?"}><img src={msgIcon} alt="Query" />What's the weather like in Portugal?</button>
                        <button className="query" onClick={handleQuery} value={"How to write a good cover letter?"}><img src={msgIcon} alt="Query" />How to write a good cover letter?</button>
                    </div>
                </div>
                <div className="lowerSide">
                    <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
                    <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
                    <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade Plan</div>
                    <div className="listItems"><img src={userIcon} alt="Account" className="accountImg" />Joshua Perth</div>
                </div>
            </div>
            <div className="main">
                <div className="chatHeader">
                    <p>{}</p>
                </div>
                <div className="chats">
                    {messages.map((message, i) => 
                        <div key={i} className={message.isBot?"chat bot":"chat"}>
                            <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="ChatGPT" /><p className="txt">{ message.text }</p>
                        </div>
                    )}
                    <div ref={msgEnd}/>
                </div>
                <div className="chatFooter">
                    <div className="inp">
                        <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend} ><img src={sendBtn} alt="Send" /></button>
                    </div>
                    <p>ChatGPT can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        </div>
    );
}

export default App;
