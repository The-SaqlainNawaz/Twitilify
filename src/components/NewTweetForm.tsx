import { useSession } from "next-auth/react";
import Button from "./Button";
import { ProfileImage } from "./ProfileImage";
import { FormEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

function upateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if(textArea==null) return
  textArea.style.height="0"
  textArea.style.height=`${textArea.scrollHeight}px`
}

export default function NewTweetForm() {
  const session=useSession();
  if(session.status !=="authenticated") return
  return <Form/>
  
}

function Form(){
  const session=useSession();
    const [inputValue, setInputValue]=useState("")
    const textAreaRef=useRef<HTMLTextAreaElement>()

    const createInput=api.tweet.create.useMutation({onSuccess:newTweetForm=>{
      console.log(newTweetForm);
      setInputValue("")
    },})
    
    function handleSubmit(e:FormEvent){
      e.preventDefault()

      createInput.mutate({content:inputValue})
    }

    const inputRef=useCallback((textArea:HTMLTextAreaElement)=>{
    upateTextAreaSize(textArea)
    textAreaRef.current=textArea
    },[])

    useLayoutEffect(()=>{
      upateTextAreaSize(textAreaRef.current)
    },[inputValue])

    if(session.status !=="authenticated") return null
  return (
   <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
    <div className="flex gap-4">
        <ProfileImage src={session.data.user.image}/>
        <textarea 
        ref={inputRef}
        style={{height:0}}
        value={inputValue}
        onChange={e=>setInputValue(e.target.value)}
        className="flex-grow resize-none overflow-hidden text-lg outline-none" placeholder="What's happening?"></textarea>
    </div>
    <Button className="self-end">Tweet</Button>
   </form>
  )
}
