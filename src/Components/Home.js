import React, { useEffect, useState } from 'react'
import logo from "./logo-copy.png"
import { io } from 'socket.io-client'
const socket = io("https://prince-handson5-backend.onrender.com")

const Home = () => {
    const [name, setName] = useState()
    const [msg, setMsg] = useState('')

    
    useEffect(() =>{
        setName(prompt("Enter your name"))
        socket.on("message", (msg) =>{
            addMessage(msg, "incoming")
            lastMessage()
        })
    },[])

    const sendMessage = (message) =>{
        let msg = {
            name: name,
            message: message
        }
        addMessage(msg, 'outgoing')

        socket.emit("message", msg)
        lastMessage()
    }

    const addMessage = (msg, type) =>{
        const messageArea = document.querySelector(".message-area")
        const mainDiv = document.createElement("div")
        mainDiv.classList.add(type, "message")
        let data = `
            <h4>${msg.name}</h4>
            <p>${msg.message}</p>
        `
        mainDiv.innerHTML = data
        messageArea.appendChild(mainDiv)
    }

    const lastMessage = () =>{
        const messageArea = document.querySelector(".message-area")
        messageArea.scrollTop = messageArea.scrollHeight
    }

    const sendBtn = (e) =>{
        e.preventDefault()
        if (msg) {
            sendMessage(msg)
            setMsg('')
        }
    }

    return (
        <div className='main'>
            <div className="logo">
                <img src={logo} alt="" />
                <h1>{name}</h1>
            </div>
            <div className="message-area">
                {/* <div className="incoming message">
                    <h4>Prince</h4>
                    <p>Hello John How are you</p>
                </div>
                <div className="outgoing message">
                    <h4>John</h4>
                    <p>I am fine how about you</p>
                </div> */}
            </div>
            <form onSubmit={sendBtn}>
                <input type="text" name='msg' value={msg} onChange={e => setMsg(e.target.value)} placeholder='write message here..' />
                <button type='submit'><i className="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
    )
}

export default Home