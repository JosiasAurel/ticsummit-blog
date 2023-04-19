import * as contentful from "contentful";

const CONTENTFUL_SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE;
const CONTENTFUL_ENV = process.env.NEXT_PUBLIC_CONTENTFUL_ENV;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export const contentfulClient = contentful.createClient({
  space: CONTENTFUL_SPACE,
  environment: CONTENTFUL_ENV,
  accessToken: CONTENTFUL_ACCESS_TOKEN
});

