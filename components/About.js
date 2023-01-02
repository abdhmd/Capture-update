import {
  Button,
  SubHeading,
  Container,
} from "./content-styles/ContentStyles";
import aboutPic from "../public/about.jpg";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="flex flex-col md:flex-row">
      <div>
        <Image src={aboutPic} 
        className="h-52 md:h-full px-4 md:px-0"
        alt="just an image"
        />
      </div>
      <div className="py-8 lg:text-center ">
        <Container>
          <SubHeading props="about us" />
          <p className="my-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
            labore animi impedit eaque velit quo voluptatum ex pariatur in!
            Laborum veritatis officia aperiam aspernatur adipisci nobis
            recusandae quis voluptatibus voluptatem!
          </p>
          <Button props="w-full lg:w-fit"> read more </Button>
        </Container>
      </div>
    </section>
  );
};

export default About;
