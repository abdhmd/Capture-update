import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "mk768hol",
  dataset: "production",
  apiVersion: "2022-03-25",
  token: process.env.NEXT_PUBLIC_SANITY,
  ignoreBrowserTokenWarning: true,
  useCdn: false,
});


const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
