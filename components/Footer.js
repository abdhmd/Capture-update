import { Container } from "./content-styles/ContentStyles";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
const socialMedia = [
  {
    name: " facebook",
    icon: <FaFacebookF />,
    url: "https://www.facebook.com",
  },
  {
    name: " twitter",
    icon: <FaTwitter />,
    url: "https://www.twitter.com",
  },
  {
    name: " linkedin",
    icon: <FaLinkedinIn />,
    url: "https://www.linkedin.com",
  },
];
const Footer = ({ navItem }) => {
  return (
    <footer className="py-6  md:py-8 lg:py-16 bg-primary-thin">
      <Container>
        <div >
          <div className="md:flex md:items-center md:justify-between  md:mb-6">
            <ul className=" w-full flex items-center  justify-center md:justify-start gap-4 ">
              {socialMedia.map((social) => {
                return (
                  <li
                    key={social.name}
                    className="bg-black w-10 h-10 text-white flex justify-center items-center "
                  >
                    <Link href={social.url}>{social.icon}</Link>
                  </li>
                );
              })}
            </ul>
            <ul className="flex flex-col md:flex-row gap-2 md:gap-4 my-6">
              {navItem.map((item) => {
                return (
                  <li key={item} className="font-medium uppercase text-center">
                    <Link href={`${item === "home" ? "/" : `/#${item}`}`}>
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="text-center">
            <p className="font-medium uppercase">
              all copyright  <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> reserved | {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
