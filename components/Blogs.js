import { Button, Container, SubHeading } from "./content-styles/ContentStyles";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { urlFor } from "../lib/client";
import { useState, useEffect } from "react";
const Blogs = ({ categories, posts }) => {
  const fsPost = posts.filter((post) => post.categories[0].title === categories[0].title);
  const [filterMyposts, setFilterMyposts] = useState(fsPost);
  const filterPosts = (title) => {
    const filtred = posts.filter((post) => post.categories[0].title === title);
   setFilterMyposts(filtred)
  };
  const FirstPost = filterMyposts[0];
  const PostsList = filterMyposts.slice(1)
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
                className="cursor-pointer"
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
            className="w-full h-72"
          />
          <div>
            <div className="mt-4 md:mt-0">
              <h3 className="font-medium capitalize text-primary text-xl ">
                {FirstPost.title}
              </h3>
              <div className="grid  capitalize">
                <h4 className="font-medium text-sm text-gray-500">
                  {FirstPost.name} | {FirstPost.publishedAt}
                </h4>
                <span className="-mt-4  text-gray-500">__________</span>
              </div>

              <p className="my-4 text-gray-700">{FirstPost.subtitle}</p>
              <button>
                <Link href="/" className="flex items-center gap-1 text-primary">
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

          <ul className="my-4 md:my-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-20 lg:gap-x-2">
            {PostsList?.map((post) => {
              return (
                <li key={post._id} className="">
                  <Link
                    href="/"
                    className="grid grid-cols-2 gap-4 grid-rows-1  "
                  >
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt="just an image"
                      className="w-full h-32 shadow-lg "
                    />
                    <p className="text-sm font-medium leading-4  h-fit">
                      {post.title}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="text-center">
          <Button props="w-full md:w-fit">read more blogs</Button>
        </div>
      </Container>
    </section>
  );
};

export default Blogs;
