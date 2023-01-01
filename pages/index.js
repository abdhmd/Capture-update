import { Header,  About, Contact, Subscribe, BlogsSection } from "../components";
import { client } from "../lib/client";
import groq from "groq";
const Home = ({ category,posts }) => {
  return (
    <div>
      <Header heading="capture" subHeading="tell a story of an amazing photo" />
      <BlogsSection categories={category}  posts={posts}/>
      <About />
      <Contact />
      <Subscribe />
    </div>
  );
};

export async function getStaticProps() {
  const category = await client.fetch(`*[_type == "category"]`);
  const posts = await client.fetch(groq`
  *[_type == "post"] {
   _id,
   title,
   subtitle,
   "name": author->name,
   "authorImage": author->avatar,
   "categories": categories[]-> {title},
   body,
   mainImage,
   "slug":slug.current,
   publishedAt
   
  }`);
  return {
    props: {
      category,
      posts
    },
  };
}

export default Home;
