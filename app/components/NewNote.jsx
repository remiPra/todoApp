import { Form, useTransition } from '@remix-run/react';
import { useState } from 'react';
import styles from './NewNote.css';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function NewNote({data}) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setContent(editorRef.current.getContent())
    }
  };
  const [content,setContent] = useState(null)
  
  const [view,setView] = useState()



  const navigation= useTransition()
  const isSubmit = navigation.state ==="submitting"
 
  return (

    <Form method="post" id="note-form">
      {data?.message ? <p>{data.message}</p> : null}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p style={{position:"relative"}}>
        <label htmlFor="content">Content</label>
        <textarea type="hidden" value={content} id="content" name="content" rows="5" required />
     
      
      {/* <div style={{position:"absolute",zIndex:12,top:'0px',left:'0px',height:'240px',width:'100%',background:'red'}}></div> */}
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
           'removeformat | help'+'image'+ 'blockquote',
           content_style: 'body {background-color:#b779f4; font-family:Helvetica,Arial,sans-serif; font-size:14px }',
           images_file_types: 'jpg,svg,webp'
          }}
       />
        </p>
       
      <div className="form-actions">
        <button disabled={isSubmit}>{(isSubmit) ? ('Adding...') : ('Add Note')}</button>
      </div>
    </Form>
  );
  
}

export default NewNote;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}