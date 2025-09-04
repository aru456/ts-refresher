

const PostCard = (props : {title:string, body : string}) => {
    return (
        
        <div className="card">
            <h4>{props.title}</h4>
            <p>{props.body}</p>
        </div>
        
    );
}

export default PostCard;