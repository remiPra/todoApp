import { json, redirect } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import NewNote,{links as newNoteLinks} from '~/components/NewNote'
import NoteList,{links as newNoteList} from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

function notes() {
  const notes  = useLoaderData()
  const data = useActionData()
  return (<>
    <NewNote  data={data} />
    <NoteList notes={notes} />
  </>
  )
}

export default notes


export async  function loader(){
  const notes = await getStoredNotes()
  console.log(notes)
 // return new Response(JSON.stringify(notes),{headers:{'Content type':"application/json"}})
  return json(notes)
}


//qui provient du formulaire dans NewNote
export async function action({request}){
  console.log(request)
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  //add Validation

  if(noteData.title.trim().length<5){
    return {message:'message non envoyé : titre invalide car trop court'}
  }


  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  storeNotes(updatedNotes)
  await new Promise((resolve,reject)=>setTimeout(()=>resolve(console.log(request)),500))
  //redirect user
  return redirect('/')
}


export function links(){
  return [...newNoteLinks(),...newNoteList()]
}