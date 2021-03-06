import React, {useEffect} from 'react';
import {get, postUrl} from '../utils/http';
import Layout from '../layout/Layout';
import {Post} from '../utils/models';
import Following from "../layout/following";

const MainPage = () => {

    const [posts, setPosts] = React.useState<Post[]>([]);
    const [firsts, setFirsts] = React.useState<Post[]>([]);

    const loadPosts = () => {
        get(postUrl + "home/posts").then(
            res => {
                setPosts(res.map((p: { madeByFollowed: any; }) => p.madeByFollowed))
                setFirsts(res.map((p: { firstOfThread: any; }) => p.firstOfThread))
            }
        ).catch( err => {
            console.log(err);
        })
    }

    useEffect(() => {
        loadPosts()
    }, [])

    return (
        <div className="App">
            <Layout child={<Following posts={posts} firsts={firsts} setPosts={setPosts}/>}/>
        </div>
    )
}

export default MainPage;
