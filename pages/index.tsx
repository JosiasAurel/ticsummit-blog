import React, { useState, useEffect } from "react";
import { contentfulClient } from "../config";

const PostsIndex: React.FC = (): JSX.Element => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    contentfulClient.getEntries()
      .then(response => setPosts(response.items));
  }, []);

  return (
    <div>
      <section>
        {posts.map(post => (
          <div>
            <h1>{post.fields.title}</h1>
            <p>By <b>{post.fields.author}</b> on <em>{new Date(post.fields.dateWritten).toDateString()}</em></p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default PostsIndex;
