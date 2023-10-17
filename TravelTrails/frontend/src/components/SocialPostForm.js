import React,{useState} from 'react'
import {useSocialPostsContext} from '../hooks/useSocialPostsContext'

import {useAuthContext} from '../hooks/useAuthContext'
import { set } from 'date-fns'

const SocialPostForm =()=>{
    const{dispatch} = useSocialPostsContext()
    const{accounts}=useAuthContext()
    const[contentText,setContentText]=useState('')
    const[photos,setPhotos]=useState('')
    const[videos,setVideos]=useState('')
    const[error,setError]=useState(null)
    //const [emptyFields,setEmptyFields]=useState([])

    const handlePhotoUpload = (e) => {
        const selectedFile = e.target.files[0];
        setPhotos(selectedFile);
      };
      

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        if(!accounts) {
            setError('You must be logged in')
            return
        }
        const formData = new FormData(); // Create a new FormData object
        formData.append('contentText', contentText);
        formData.append('photos', photos); // Append the selected photo file
        formData.append('videos', videos);
        
        const socialPost = {contentText,photos,videos}
        const response = await fetch('/api/socialPosts',{
            method:'POST',
            //body:JSON.stringify(socialPost),
            body: formData,
            headers:{
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${accounts.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            //setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setContentText('')
            setPhotos('')
            setVideos('')
            setError(null)
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
           // className={emptyFields.includes('contentText')?'error':''}
            />

<label>Post photos</label>
<input
  type="file"
  onChange={handlePhotoUpload} 
  accept="image/*" // Specify that only image files are allowed
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