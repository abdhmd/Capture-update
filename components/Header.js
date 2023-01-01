const Header = ({heading , subHeading}) => {
  return (
    <header className=" w-full  flex flex-col items-center justify-center py-8 px-4 md:py-14 lg:py-16  ">
        <h1 className="uppercase font-bold text-3xl md:text-6xl lg:text-8xl xl:text-9xl text-center mb-2">
          {heading}
        </h1>
        <h2 className="uppercase font-medium text-center leading-5 text-gray-700 text-xl mb-2">
          {subHeading}
        </h2>
        <span className="w-10 h-1 bg-gray-700"></span>
    </header>
  )
}

export default Header