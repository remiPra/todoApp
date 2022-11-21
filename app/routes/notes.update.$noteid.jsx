import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react'
import UpdateNote,{links as NewNoteUpdate} from '~/components/UpdateNote';
import { getStoredNotes, storeNotes } from '~/data/notes';


function updateNote() {
  const note = useLoaderData();
  const [notef,setNoteF]= React.useState(note)  
 
    
    // const data = {message:"update",note}
  return (<>
    <div>{note.title}</div>
    <div>{JSON.stringify(notef)}</div>
    <UpdateNote note={note}/>
  </>
  )
}

export async function loader({ params }) {
    const notes = await getStoredNotes();
    const note = notes.find(el => el.id === params.noteid)   
    return note
  }



//qui provient du formulaire dans NewNote
export async function action({request,params}){
  console.log(request)
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  //add Validation

  if(noteData.title.trim().length<5){
    return {message:'message non envoyé : titre invalide car trop court'}
  }

  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.filter(el => el.id != noteData.id)
  // const existingNotes = await getStoredNotes();
  
  const updatedNotesData = updatedNotes.concat(noteData);
  storeNotes(updatedNotesData)
  await new Promise((resolve,reject)=>setTimeout(()=>resolve(console.log(request)),500))
  //redirect user
  return redirect('/')
}

export default updateNote

export function links(){
  return [...NewNoteUpdate()]
}