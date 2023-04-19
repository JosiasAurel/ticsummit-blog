import React, { useState, useEffect } from "react";
import Link from "next/link";
import { contentfulClient } from "../../config";

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
          <Link href={`/posts/${post.sys.id}`}>
            <div>
              <h1>{post.fields.title}</h1>
              <p>By <b>{post.fields.author}</b> on <em>{new Date(post.fields.dateWritten).toDateString()}</em></p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default PostsIndex;
