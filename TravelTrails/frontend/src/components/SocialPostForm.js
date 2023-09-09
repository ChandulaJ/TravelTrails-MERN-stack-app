import React,{useState} from 'react'
const SocialPostForm =()=>{
    const[author,setAuthor]=useState('')
    const[contentText,setContentText]=useState('')
    const[photos,setPhotos]=useState('')
    const[videos,setVideos]=useState('')
    const[error,setError]=useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const socialPost = {author,contentText,photos,videos}
        const response = await fetch('/api/socialPosts',{
            method:'POST',
            body:JSON.stringify(socialPost),
            headers:{'Content-Type':'application/json'}
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setError(null)
            console.log('socialPost added',json)
            setAuthor('')
            setContentText('')
            setPhotos('')
            setVideos('')
        }
    }

    return(
        <form className='create' onSubmit = {handleSubmit}>
            <h3>Add a new post</h3>
            <label>Post author</label>
            <input
            type='text'
            onChange={(e)=>setAuthor(e.target.value)}
            value ={author}
            />

<label>Post contentText</label>
            <input
            type='text'
            onChange={(e)=>setContentText(e.target.value)}
            value ={contentText}
            />

<label>Post photos</label>
            <input
            type='text'
            onChange={(e)=>setPhotos(e.target.value)}
            value ={photos}
            />

<label>Post videos</label>
            <input
            type='text'
            onChange={(e)=>setVideos(e.target.value)}
            value ={videos}
            />
<button>Add workout</button>
{error && <div className="error">{error}</div>}
            </form>

    )
}
export default SocialPostForm