import { useState } from "react";
import BgImage from "./assets/background.png";
import Logo from "./assets/logo.png";

function App() {
  return (
    <>
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage: `url(${BgImage})`,
          }}
        >
          <img
            src={Logo}
            alt="logo"
            className="absolute w-44 h-10 left-10 top-6"
          />
          <div className="w-full z-10 grid grid-cols-4 gap-10">
            <p className="leftText col-span-1 m-auto pb-64 uppercase text-white -rotate-90 w-max h-12">
              TECHNICAL TEST FRO FRENTEND DEVELOPER
            </p>
            <div className="rightText col-span-3 flex flex-col gap-12">
              <h1 className="text-5xl text-left tracking-wide">
                All your services, No-code.
              </h1>
              <p className="text-3xl my-4">
                Build your business apps and automate your tasks without coding.
              </p>
              <button className="editBtn w-64 h-12 bg-transparent text-lg text-white font-bold rounded-full border-2 border-color-white hover:bg-white hover:text-[#5068F2]">
                Edit a PDF
              </button>
            </div>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex flex-col items-center justify-center text-center md:px-6 px-0 z-0 relative"
          style={{ backgroundColor: "#ffff" }}
        >
          <div className="absolute mx-auto top-10 z-20 text-center w-full">
            <h1 className="rightTitle text-4xl text-white lg:text-black">
              PDF Editor
            </h1>
            <p className="py-6 space-x-2 text-white lg:text-black text-xl">
              Edit PDF files. Fill & sign PDF
            </p>
          </div>
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>

          <div className="editText flex flex-col md:flex-row justify-center items-center gap-1 w-full py-6 z-20">
            <p className="title lg:text-black text-md text-white">
              TECHNICAL TEST FOR FRONTEND DEVELOPER
            </p>
            <span className="edit text-md text-[#5068F2] hover:underline cursor-pointer">Edit a PDF</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
