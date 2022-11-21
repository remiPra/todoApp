import { redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useTransition } from "@remix-run/react"
import { useState } from "react";
import { getStoredNotes, storeNotes } from "~/data/notes"

import styles from '../styles/NoteDetails.css'

function noteid() {
  const navigation= useTransition()

  const note = useLoaderData();
  const data = useActionData();
 
  function test() {

    console.log("zeze")
  }

  const isSubmit = navigation.state ==="submitting"

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to='/notes'>retour Accueil</Link>
        </nav>
        <p>{note.title}</p>
        <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html:note.content}}></div>
     
        <Form method="post" className="form-actions">
          {/* <button type="submit">Delete</button> */}
          <button disabled={isSubmit}>{(isSubmit) ? ('Deleting...') : ('Delete')}</button>
        </Form>
        <Link className="form-actions" to={`/notes/update/${note.id}`}>
          <button>Update</button>
        </Link>
        {JSON.stringify(data)}
      </header>

    </main>
  )
}

export default noteid

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const note = notes.find(el => el.id === params.noteid)
  
  return note
}

export async function action({request,params}){
  console.log(request)
  
  


  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.filter(el => el.id != params.noteid)
  
  storeNotes(updatedNotes)
  await new Promise((resolve,reject)=>setTimeout(()=>resolve(console.log(request)),1000))
 
  return redirect('/')
  
}