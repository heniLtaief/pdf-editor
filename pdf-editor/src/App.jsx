import { useState } from "react";
import BgImage from "./assets/background.png";
import Logo from "./assets/logo.png";

function App() {
  return (
    <>
      <div className="grid grid-cols-4 h-full w-full">
        <div
          className="background relative flex items-center col-span-2 object-fit w-full h-screen"
          style={{
            backgroundImage: `url(${BgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            src={Logo}
            alt="logo"
            className="absolute w-32 h-10 left-12 top-6"
          />
          <div className="textContainer grid grid-cols-4 ">
            <p className="leftText col-span-1 m-auto pb-64 uppercase text-white -rotate-90 w-max h-12">
              TECHNICAL TEST FRO FRENTEND DEVELOPER
            </p>
            <div className="rightText col-span-3 flex flex-col gap-12">
              <p className="heading text-6xl text-white">
                All your services, No-code.
              </p>
              <p className="subHeading text-white text-lg">
                Build your business apps and automate your tasks without coding.
              </p>
              <button className="editBtn w-64 h-12 bg-transparent text-white rounded-full border-2 border-color-white hover:bg-white hover:text-[#5068F2]">
                Edit a PDF
              </button>
            </div>
          </div>
        </div>
        <div className="edit col-span-2 ">
          <div className="editText flex justify-center items-center h-screen w-full gap-1">
            <p className="title text-black text-md">
              TECHNICAL TEST FRO FRENTEND DEVELOPER
            </p>
            <span className="edit text-md text-[#5068F2]">Edit a PDF</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
