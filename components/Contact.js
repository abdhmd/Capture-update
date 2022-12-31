import React from "react";
import { Button, SubHeading, Container } from "./content-styles/ContentStyles";

import { TiLocation } from "react-icons/ti";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const contactInfo = [
  {
    title: "our location",
    icon: <TiLocation />,
    content: "Capture Location FL 1234 City",
  },
  {
    title: "phone number",
    icon: <AiFillPhone />,
    content: "+(123) 456 789 00",
  },
  {
    title: "email address",
    icon: <MdEmail />,
    content: "capture@info.com",
  },
];

const Contact = () => {
  return (
    <section id="contact" className=" py-6  md:py-8 lg:py-16 bg-primary-thin ">
      <SubHeading props="contact us" />
      <Container>
        <div className="grid  mt-8 gap-4 md:gap-8 md:grid-cols-2  ">
          <div className="flex flex-col gap-4 ">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-transparent border border-black  py-2 pl-3 focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent bg-none border border-black py-2 pl-3  focus:border-primary focus:outline-none"
            />
            <textarea
              type="text"
              placeholder="Your Message"
              className="bg-transparent bg-none border border-black py-2  pl-3 h-24 focus:border-primary focus:outline-none"
            />
            <Button props="w-full md:w-fit">send message</Button>
          </div>
          <div className="border border-solid border-black flex flex-col p-4 gap-2 md:justify-center">
            {contactInfo.map((info) => {
              return (
                <div key={info.title} className=" flex  items-start gap-4 ">
                  <div className="bg-black w-10 h-10 text-white flex justify-center items-center mt-2">{info.icon}</div>
                  <div className=" ">
                    <h3 className="font-medium text-xl text-primary capitalize mt-0">{info.title}</h3>
                    <span className=" flex w-10 h-0.5 bg-black mt-2 "></span>
                    <p className="text-gray-700 text-sm capitalize mt-2">{info.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
