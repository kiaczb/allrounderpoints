import Image from "next/image";
const Nav = () => {
  return (
    <div className="sticky top-0 flex justify-between pl-3 pr-8 shadow-md mb-15 w-auto items-center bg-white dark:bg-gray-800">
      <Image
        src="/speedcubing.png"
        alt="Speedcubing Logo"
        width={200}
        height={100}
      />
    </div>
  );
};

export default Nav;
