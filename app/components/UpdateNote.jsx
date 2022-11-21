import { Form, useTransition } from '@remix-run/react';
import { useState } from 'react';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from './NewNote.css';

function UpdateNote({note}) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setContent(editorRef.current.getContent())
    }
  };
  
 
    const [title,setTitle]= useState(note.title)
    const [content,setContent]= useState(note.content)


  const navigation= useTransition()
  const isSubmit = navigation.state ==="submitting"
 
  return (

    <Form method="post" id="note-form">
      {/* {data?.message ? <p>{data.message}</p> : null} */}
      <p>
        <label htmlFor="title">Title</label>
        <input value={title} onChange={e=>setTitle(e.currentTarget.value)} type="text" id="title" name="title" required />
      </p>
        <input type='hidden' value={note.id}  id="id" name="id" required />
      <p>
        <label htmlFor="content">Content</label>
        <textarea value={content} onChange={e=>setContent(e.currentTarget.value)} id="content" name="content" rows="5" required />
        <Editor
        onKeyDown={log}
        apiKey='6ztoevx7at9ej6dibcvmhjeda1slkeqw64zucs9bcodphk4p'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={note.content}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount','image'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help'+'image',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
           images_file_types: 'jpg,svg,webp'
          }}
       />
      </p>
      <div className="form-actions">
        <button disabled={isSubmit}>{(isSubmit) ? ('Updating...') : ('Update')}</button>
      </div>
      
    </Form>
  );
  
}

export default UpdateNote;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}