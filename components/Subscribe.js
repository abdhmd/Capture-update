import { Button, SubHeading, Container } from "./content-styles/ContentStyles";

const Subscribe = () => {
  return (
    <section id="subscribe" className="py-6  md:py-8 lg:py-16">
      <SubHeading props="subscribe" />
      <Container>
        <h3 className="font-medium  text-center text-primary uppercase my-4">
          for more features and news
        </h3>

        <div className="w-full  grid  md:grid-cols-3 gap-4">
          <input
            type="email"
            placeholder="Enter Your Email ..."
            className=" w-full col-span-2 bg-transparent border border-black  py-2 pl-3 focus:border-primary focus:outline-none"
          />
          <Button props="w-full col-span-2 md:col-span-1">subscribe</Button>
        </div>
      </Container>
    </section>
  );
};

export default Subscribe;
