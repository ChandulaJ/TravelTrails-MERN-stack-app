import { useSocialPostsContext } from "../hooks/useSocialPostsContext";
import {useAuthContext} from "../hooks/useAuthContext";

//date fns
import { formatDistanceToNow } from 'date-fns'

const SocialPostDetails = ({ socialPost }) => {
    const {dispatch} = useSocialPostsContext()
    const {accounts} = useAuthContext()

    const handleClick = async() => {
        if(!accounts){
            return
        }
        const response = await fetch('/api/socialPosts/'+socialPost._id,{
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${accounts.token}`
            }
        })
        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_SOCIALPOST',payload: json})
    }
}
    return(
        <div className="socialPost-details">
            <h4>{socialPost.author}</h4>
            <p><strong>Post description: </strong>{socialPost.contentText}</p>
            <p><strong>Photo: </strong>{socialPost.photo}</p>
            <p><strong>Video: </strong>{socialPost.video}</p>
            <p>{formatDistanceToNow(new Date(socialPost.createdAt),{addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}
export default SocialPostDetails