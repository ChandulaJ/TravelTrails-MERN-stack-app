import React,{useState} from 'react'
import {useSocialPostsContext} from '../hooks/useSocialPostsContext'

import {useAuthContext} from '../hooks/useAuthContext'
import { set } from 'date-fns'

const SocialPostForm =()=>{
    const{dispatch} = useSocialPostsContext()
    const{accounts}=useAuthContext()
    const[contentText,setContentText]=useState('')
    const [base64Photo, setBase64Photo] = useState('');
    const[photos,setPhotos]=useState(null)
    const[videos,setVideos]=useState('')
    const[error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])

    const handleFileChange = (e) => {
        const selectedPhoto = e.target.files[0];
        if (selectedPhoto) {
          const reader = new FileReader();
      
          reader.onload = (event) => {
            const base64Photo = event.target.result;
            setBase64Photo(base64Photo);
          };
      
          reader.readAsDataURL(selectedPhoto);
        }
      };
      
    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        if(!accounts) {
            setError('You must be logged in')
            return
        }
        //const socialPost = {contentText,photos,videos}

        const socialPost = {
            contentText,
            photos: base64Photo, 
            videos,
          };

        const response = await fetch('/api/socialPosts',{
            method:'POST',
            body:JSON.stringify(socialPost),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accounts.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setContentText('')
            setPhotos('')
            setVideos('')
            setError(null)
            setEmptyFields([])  
            console.log('socialPost added',json)
            dispatch({type:'CREATE_SOCIALPOST',payload:json})

        }
    }

    return(
        <form className='create' onSubmit = {handleSubmit}>
            <h3>Add a new post</h3>
          

<label>Post contentText</label>
            <input
            type='text'
            onChange={(e)=>setContentText(e.target.value)}
            value ={contentText}
           
            />
<label>Post photos</label>
      <input
        type="file" // Use type="file" for photo uploads
        onChange={handleFileChange}
      />

<label>Post videos</label>
            <input
            type='text'
            onChange={(e)=>setVideos(e.target.value)}
            value ={videos}
            />
<button>Add post</button>

{error && <div className="error">{error}</div>}
            </form>

    )

}

export default SocialPostForm