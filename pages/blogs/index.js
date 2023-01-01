import Header from "../../components/Header";
import { Container } from "../../components/content-styles/ContentStyles";
import { client, urlFor } from "../../lib/client";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";
import groq from "groq";
import { useState } from "react";

const Blogs = ({ posts, category }) => {
  const categories = category;

  const [filterMyposts, setFilterMyposts] = useState(posts);
  // filter my posts
  const filterPosts = (title) => {
    const filtred = posts.filter((post) => post.categories[0].title === title);
    setFilterMyposts(filtred);
  };
  return (
    <section>
      <Header heading="trending blogs" subHeading="best story" />
      <Container>
        <ul className="flex justify-center gap-2 md:gap-4 text-sm font-medium my-6 md:my-8">
          <li
            className="cursor-pointer uppercase "
            onClick={() => {
              setFilterMyposts(posts);
            }}
          >
            all
          </li>
          {categories?.map((category) => {
            return (
              <li
                key={category._id}
                onClick={() => filterPosts(category.title)}
                className="cursor-pointer uppercase "
              >
                {category.title}
              </li>
            );
          })}
        </ul>
        <div className="grid  md:grid-cols-2 justify-start gap-2">
          {filterMyposts.map((post) => {
            return (
              <div
                key={post._id}
                className="border border-black p-2 flex flex-col h-fit"
              >
                <img
                  src={urlFor(post.mainImage).url()}
                  alt="image"
                  className="w-full h-52"
                />
                <div>
                  <h3 className="text-xl font-medium mb-4">{post.title}</h3>
                  <div className="flex gap-1">
                    {post.categories.map((category) => {
                      return (
                        <p
                          key={category.title}
                          className="text-xs font-medium text-white p-1 bg-primary lowercase "
                        >
                          {`#${category.title}`}
                        </p>
                      );
                    })}
                  </div>
                  <p>{post.subtitle}</p>
                  <button>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="flex items-center gap-1 text-primary"
                    >
                      Read more
                      <span className="flex  text-black ">
                        <HiArrowLongRight />
                      </span>
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
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
      posts,
    },
  };
}

export default Blogs;
