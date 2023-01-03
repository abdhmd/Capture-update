import { Button, Container, SubHeading } from "./content-styles/ContentStyles";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { urlFor } from "../lib/client";
import { useState } from "react";

export const publishedAt = (jsonDate) => {
  const date = new Date(jsonDate).getDate();
  const month = new Date(jsonDate).getMonth();
  const year = new Date(jsonDate).getFullYear();

  return `${date}-${month}-${year}`;
};

const BlogsSection = ({ categories, posts }) => {
  const fsPost = posts.filter(
    (post) => post.categories[0].title === categories[0].title
  );
  const [filterMyposts, setFilterMyposts] = useState(fsPost);
  const [active ,setActive] = useState(categories[0].title)

  // filter my posts
  const filterPosts = (title) => {
    const filtred = posts.filter((post) => post.categories[0].title === title);
    setFilterMyposts(filtred);
    setActive(title)
  };
  const PostsList = filterMyposts.slice(1);

  // choose first post
  const FirstPost = filterMyposts[0];

  return (
    <section id="blog" className="py-6  md:py-8 lg:py-16">
      <SubHeading props="latest blogs" />
      <Container>
        <ul className="flex justify-center gap-2 md:gap-4 text-sm font-medium my-6 md:my-8">
          {categories?.map((category) => {
            return (
              <li
                key={category._id}
                onClick={() => filterPosts(category.title)}
                className={`${
                  (category.title === active) & (filterMyposts != posts) &&
                  "text-primary duration-100"
                } cursor-pointer uppercase mx-2 `}
              >
                {category.title}
              </li>
            );
          })}
        </ul>

        <div className="grid gap-2 md:gap-6 md:grid-cols-2">
          <img
            src={urlFor(FirstPost.mainImage).url()}
            alt="image"
            className="w-full h-52 md:h-72 shadow-md object-cover"
          />
          <div>
            <div className="mt-4 md:mt-0">
              <h3 className="font-medium capitalize text-primary text-xl ">
                {FirstPost.title}
              </h3>
              <div className="grid  capitalize">
                <h4 className="font-medium text-sm text-gray-500">
                  {FirstPost.name} | {publishedAt(FirstPost.publishedAt)}
                </h4>
                <span className="-mt-4  text-gray-500">__________</span>
              </div>

              <p className="my-4 text-gray-700">{FirstPost.subtitle}</p>
              <button>
                <Link
                  href={`/blogs/${FirstPost.slug}`}
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
        </div>
        <div>
          <div className=" flex md:grid md:grid-cols-4 items-center justify-between  my-4 md:my-8">
            <h3 className="font-medium text-sm  capitalize text-gray-700 w-full">
              more seggestions
            </h3>
            <span className=" flex w-full h-0.5 col-span-3 bg-primary"></span>
          </div>

          <ul className="my-4 border border-black p-4 md:my-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {PostsList?.map((post) => {
              return (
                <li key={post._id} className="">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="grid  items-center gap-4 grid-rows-1  "
                  >
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt="just an image"
                      className="w-full h-36 shadow-md object-cover"
                    />
                    <div className=" h-full  flex flex-col justify-between">
                      <p className="  text-sm capitalize  font-semibold leading-5  h-fit">
                        {post.title}
                      </p>
                      <h4 className="font-medium text-sm text-gray-500">
                        {post.name} | {publishedAt(post.publishedAt)}
                      </h4>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="text-center">
          <Button props="w-full md:w-fit">
            <Link href="/blogs">read more blogs</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default BlogsSection;
