import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { contentfulClient } from "../../config";
import styles from "../../styles/post.module.css";

type Props = {
  post: any
}

function getInterests(contentfulObj) {
  const interest = {
    title: contentfulObj.fields.title,
    author: contentfulObj.fields.author,
    dateWritten: new Date(contentfulObj.fields.dateWritten).toDateString(),
    content: contentfulObj.fields.postContent.content,
    previewImg: contentfulObj.fields.previewImage.fields.file.url
  };

  return interest;
}

const Post: NextPage<Props> = ({ post }): JSX.Element => {
  useEffect(() => {
    console.log(post);
  }, []);

  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>
        <main className={styles.postMain}>
          <img src={post.previewImg} />
          <h1>{post.title}</h1>
          <span style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <p>By <b>{post.author}</b></p>
            <p>Written on <em>{post.dateWritten}</em></p>
          </span>
        </main>
        <hr />
        <article>
          {post.content.map(item => {
            if (item.nodeType === "paragraph") {
              return (
                <p>{item.content[0].value}</p>
              )
            } else if (item.nodeType === "embedded-asset-block") {
              const asset = item.data.target.fields;
              const assetImg = asset.file.url;
              const assetName = asset.title;
              return (
                <img src={assetImg} alt={assetName} />
              )
            }
          })}
        </article>
        <p>
          &copy; ticsummit.org {new Date().getFullYear()}
        </p>
      </div>

    </div>
  )
}

Post.getInitialProps = async ({ query }) => {
  const postId = query.post;
  const _content = await contentfulClient.getEntry(postId as any);
  const content = getInterests(_content);

  return { post: content }
}

export default Post;
