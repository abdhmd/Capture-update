import Header from "../../components/Header";
import { Container } from "../../components/content-styles/ContentStyles";
import { client, urlFor } from "../../lib/client";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";
import groq from "groq";
import { useState } from "react";
import { publishedAt } from "../../components/BlogsSection";

const Blogs = ({ posts, category }) => {
  const categories = category;

  const [filterMyposts, setFilterMyposts] = useState(posts);
  const [active, setActive] = useState();
  // filter my posts
  const filterPosts = (title) => {
    const filtred = posts.filter(
      (post) =>
        (post.categories[0] != undefined &&
          post.categories[0].title === title) ||
        (post.categories[1] != undefined && post.categories[1].title === title)
    );

    setActive(title);
    setFilterMyposts(filtred);
  };
  return (
    <section className="py-6  md:py-8 lg:py-16">
      <Header heading="trending blogs" subHeading="best story" />
      <Container>
        <ul className="flex justify-center gap-2 md:gap-4 text-sm font-medium my-6 md:my-8">
          <li
            className={`${
              filterMyposts === posts && "text-primary duration-100"
            } cursor-pointer uppercase  `}
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
                onClick={() => {
                  filterPosts(category.title);
                }}
                className={`${
                  (category.title === active) & (filterMyposts != posts) &&
                  "text-primary duration-100"
                } cursor-pointer uppercase  `}
              >
                {category.title}
              </li>
            );
          })}
        </ul>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start  w-full ">
          {filterMyposts.map((post) => {
            return (
              <div key={post._id} className="  grid  h-max  gap-4   pb-4 ">
                <img
                  src={urlFor(post.mainImage).url()}
                  alt="image"
                  className="w-full h-52 lg:h-56 shadow-md object-cover"
                />
                <div className="">
                  <h3 className="text-2xl font-medium mb-4">{post.title}</h3>
                  <h4 className="mb-2 text-gray-500 font-medium">
                    {post.name} | {publishedAt(post.publishedAt)}
                  </h4>
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
                  <p className=" overflow-hidden h-12 my-2">{post.subtitle}</p>
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
    *[_type == "post"] | order(publishedAt desc) {
     _id,
     title,
     subtitle,
     "name": author->name,
     "authorImage": author->avatar,
     "categories": categories[]-> {title},
     body,
     mainImage,
     "slug":slug.current,
     publishedAt,
     _createdAt
     
    }`);
  return {
    props: {
      category,
      posts,
    },
  };
}

export default Blogs;
