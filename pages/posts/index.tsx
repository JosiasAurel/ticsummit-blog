import React from "react";
import Text from "../../components/Text";
import Nav from "../../components/Nav";
import Post, { LocalPost } from "../../components/Post";
import type { LocalPost as LocalPostType } from "../../components/Post";
import { sourcedWritings } from "../../writing/sourced";

import { readdirSync } from "fs";

type Props = {
    articles: LocalPostType[];
};

const HomePage: React.FC<Props> = ({ articles }) => {
    return (
        <div>
            <Nav />
            <span style={{ maxHeight: "5px" }}>
                <h2
                    style={{
                        fontFamily: "EB Garamond",
                        fontSize: "2rem",
                    }}
                >
                    Writing
                </h2>
            </span>
            <div>
                {articles
                    .sort((a, b) => b.num - a.num)
                    .map((article) => (
                        <LocalPost
                            title={article.title}
                            date={article.date}
                            description={article.description}
                            name={article.name.split(".")[0]}
                            num={article.num}
                        />
                    ))}

                {sourcedWritings.map((writing) => (
                    <Post
                        key={writing.title + writing.link}
                        link={writing.link}
                        title={writing.title}
                        views={writing.views}
                        host={writing.host}
                    />
                ))}
            </div>

            <br />
            <br />
            <div></div>
        </div>
    );
};

export async function getStaticProps() {
    let files = readdirSync("./pages/writing/");

    files = files.filter(
        (file) => file !== "index.tsx" && file !== "template.mdx"
    );

    const articles_ = files.map(async (file) => {
        const { title, description, date, num } = await require(`./${file}`);
        const article: LocalPostType = {
            title,
            description,
            date,
            name: file,
            num,
        };
        return article;
    });

    const articles = await Promise.all(articles_);

    return {
        props: {
            articles,
        },
    };
}

export default HomePage;