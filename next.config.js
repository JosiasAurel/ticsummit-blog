import nextMDX from "@next/mdx";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
// import rehypeMathJaxSvg from "rehype-mathjax";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import fauxRemarkEmbedder from "@remark-embedder/core";
import fauxOembedTransformer from "@remark-embedder/transformer-oembed";

const remarkEmbedder = fauxRemarkEmbedder.default;
const oembedTransformer = fauxOembedTransformer.default;

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            remarkMath,
            [remarkEmbedder, { transformers: [oembedTransformer] }],
            remarkGfm,
        ],
        rehypePlugins: [rehypeMathjax, rehypeHighlight],
        providerImportSource: "@mdx-js/react",
    },
});

export default withMDX({
    pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
    outputFileTracing: true,
    swcMinify: true,
});

/* module.exports = {
    outputFileTracing: true,
    swcMinify: true
} */