import { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";

type Post = {
    userId:number,
    id: number,
    title:string,
    body:string

};

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<string | null >(null);
    const [q,setQ] = useState("");

    const ctrlRef = useRef<AbortController | null>(null);


    useEffect(()=>{
        console.log("effect : start");

        const ac = new AbortController();

        fetch("https://jsonplaceholder.typicode.com/posts", {signal : ac.signal})
        .then((res)=>{
            if(!res.ok) throw new Error("Failed to fetch Data");
            return res.json() as Promise<Post[]>;
        })
        .then((data) => {
            console.log("effect: fetch resolved", data.length);
            setPosts(data);
        })
        .catch((err : any) =>{
            if(err?.name === "AbortError"){
                console.log("effect : fetch ABORTED");
            }
            else{
                console.log("effet : fetch Error", err);
                setError(err?.message ?? "Unknown Error");
            }
        })
        .finally(()=>{
            console.log("effect : finally()");
            setLoading(false);
        })

        return () => {
            console.log("cleanup : aborting fetch");
            ac.abort();
        };
    },[]);

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setQ(v);

        ctrlRef?.current?.abort();
        console.log("aborted prvious if any");

        if(!v.trim()) return;

        const ac = new AbortController();
        ctrlRef.current = ac;

        fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${encodeURIComponent(v)}`, {signal : ac.signal})
        .then((r) => r.json())
        .then((data : Post[]) => {
            console.log("Resolved for ", v , "items: " , data.length)
            setPosts(data);
        })
        .catch((err) =>{
            if(err.name === "AbortError" ) console.log("Request ABorted");
            else console.log(err);
        })
    };

    if(loading) return <div>Loading......</div>

    if(error) return <div role = 'alert'>Error : {error}</div>

    return (
        <div className="postList">
            <input 
                value= {q} 
                onChange={onChange} 
                placeholder="Type to search"
            />
            {posts.map((post) =>(
                <PostCard key = {post.id} title={post.title} body = {post.body}/>
            ))}
        </div>
    );
};

export default PostList;