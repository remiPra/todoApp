import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import NoteList,{links as newNoteList} from "~/components/NoteList";
import { getStoredNotes } from "~/data/notes";
import { Editor } from '@tinymce/tinymce-react';
import homeStyles from "../styles/home.css"
import { useRef } from "react";

export default function Index() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setContent(editorRef.current.getContent())
    }
  };
  
  const notes  = useLoaderData() 
  
  return (<>
  <main id="content">
  <Editor
        
        onKeyDown={log}
        apiKey='6ztoevx7at9ej6dibcvmhjeda1slkeqw64zucs9bcodphk4p'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           
           height: 200,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount','image'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help'+'image',
           content_style: 'body {background-color:white; font-family:Helvetica,Arial,sans-serif; font-size:14px }',
           images_file_types: 'jpg,svg,webp'
          }}
       />
    <h1>A better way to class your notes</h1>
    <p>try out to better notes </p>
    <p id="cta">
    <Link to='/notes'>Try now</Link>
    </p>
    <NoteList notes={notes}/>
  </main>
  </>
  );
}


export async  function loader(){
  const notes = await getStoredNotes()
 // return new Response(JSON.stringify(notes),{headers:{'Content type':"application/json"}})
  return json(notes)
}


export function links(){
  return[{rel:'stylesheet',href:homeStyles},...newNoteList()]
}
