import { Header } from "../../components";
import { Container } from "../../components/content-styles/ContentStyles";
import { client, urlFor } from "../../lib/client";
import { publishedAt } from "../../components/BlogsSection";
import Link from "next/link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Post = ({ post, posts }) => {
  const filter = posts.filter(
    (p) => p.categories[0].title === post.categories[0].title
  );

  const PostsList = filter;

  const text = post.body.map((content) => content.children);

  return (
    <Container>
      <Header
        heading={post.title}
        subHeading={`${post.name} | ${publishedAt(post.publishedAt)}`}
      />

      <section className="flex flex-col gap-4 py-6  md:py-8 lg:py-16">
        <button className=" w-full  md:w-fit h-12  text-black flex  gap-2 ">
          <div className="bg-black text-white  flex justify-center items-center   w-12 h-full text-xl">
            <AiOutlineArrowLeft />
          </div>
          <Link
            href="/blogs"
            className="border border-black w-full h-full md:px-4 flex justify-center items-center text-xl font-medium uppercase "
          >
            back to blogs
          </Link>
        </button>
        <div className="h-52 md:h-96 lg:h-screen  w-full lg:border border-black lg:p-4">
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="h-full w-full shadow-md object-cover"
          />
        </div>

        <div className=" grid md:grid-cols-3 gap-4">
          <div className=" flex flex-col justify-between   md:col-span-2">
            <div className="  flex flex-col lg:text-xl gap-4 mb-4 border border-black p-4 h-full ">
              {text.map((paragraph, i) => {
                return <p key={i}>{paragraph[0].text}</p>;
              })}
            </div>

            <div className="border border-black p-4">
              <div className=" flex md:grid md:grid-cols-4 items-center justify-between  my-4 ">
                <h3 className="font-medium text-sm  capitalize text-gray-700 w-full">
                  a blog about
                </h3>
                {/* <span className=" flex w-full h-0.5 col-span-3 bg-primary"></span> */}
              </div>

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

              <div className=" flex md:grid md:grid-cols-4 items-center justify-between  my-4">
                <h3 className="font-medium text-sm  capitalize text-gray-700 w-full">
                  share the blog
                </h3>
                {/* <span className=" flex w-full h-0.5 col-span-3 bg-primary"></span> */}
              </div>
              <div className="flex gap-4">
                <button>
                  <Link
                    href="https://www.facebook.com"
                    className="flex bg-blue-700 text-white justify-center items-center gap-2 text-xs font-semibold uppercase px-3 py-2"
                  >
                    <span>
                      <FaFacebookF />
                    </span>
                    <span>facebook</span>
                  </Link>
                </button>
                <button>
                  <Link
                    href="https://www.twitter.com"
                    className="flex bg-cyan-500 text-white justify-center items-center gap-2 text-xs font-semibold uppercase p-2"
                  >
                    <span>
                      <FaTwitter />
                    </span>
                    <span>twitter</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className="border border-black h-fit p-4">
            <h3 className="text-center uppercase text-xl font-medium  mb-4">
              {" "}
              more seggestions
            </h3>
            <ul className="  grid gap-4 ">
              {PostsList?.map((postItem) => {
                return (
                  <li
                    key={postItem._id}
                    className={`${postItem.title === post.title && "hidden"}`}
                  >
                    <Link
                      href={`/blogs/${postItem.slug}`}
                      className="grid  items-center gap-4 grid-rows-1  "
                    >
                      <img
                        src={urlFor(postItem.mainImage).url()}
                        alt="just an image"
                        className="w-full h-40 shadow-md object-cover "
                      />
                      <div className=" h-full  flex flex-col justify-between">
                        <p className="  text-sm capitalize  font-semibold leading-5  h-fit">
                          {postItem.title}
                        </p>
                        <h4 className="font-medium text-sm text-gray-500">
                          {postItem.name} | {publishedAt(postItem.publishedAt)}
                        </h4>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    slug {
      current
    }
  }
  `;

  const posts = await client.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const posts = await client.fetch(`
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
     
    }`);

  const query = `*[_type == "post" && slug.current == '${slug}'][0]{
    _id,
     title,
     subtitle,
     "name": author->name,
     "categories": categories[]-> {title},
     body,
     mainImage,
     publishedAt
  }`;

  const post = await client.fetch(query);

  return {
    props: { posts, post },
  };
};

export default Post;
