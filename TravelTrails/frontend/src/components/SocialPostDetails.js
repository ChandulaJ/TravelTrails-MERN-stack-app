const SocialPostDetails = ({ socialPost }) => {
    return(
        <div className="socialPost-details">
            <h4>{socialPost.author}</h4>
            <p><strong>Post description: </strong>{socialPost.contentText}</p>
            <p><strong>Photo: </strong>{socialPost.photo}</p>
            <p><strong>Video: </strong>{socialPost.video}</p>
            <p>{socialPost.createdAt}</p>

        </div>
    )
}
export default SocialPostDetails