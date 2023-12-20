import { useState, useRef } from "react";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import BgImage from "./assets/background.png";
import Logo from "./assets/logo.png";
import MaskOne from "./assets/mask1.png";
import MaskTwo from "./assets/mask2.png";

function App() {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  const fileInputRef = useRef(null);

  // Click event for the span
  const handleSpanClick = () => {
    fileInputRef.current.click();
  };

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
              TECHNICAL TEST FRO FRONTEND DEVELOPER
            </p>
            <div className="rightText col-span-3 flex flex-col gap-12 max-w-[400px]">
              <h1 className="text-5xl text-left tracking-wide">
                All your services, No-code.
              </h1>
              <p className="text-xl my-4">
                Build your business apps and automate your tasks without coding.
              </p>
              <form className="form-group" onSubmit={handlePdfFileSubmit}>
                {/* <input
                  type="file"
                  className="form-control "
                  required
                  onChange={handlePdfFileChange}
                /> */}
                {pdfFileError && (
                  <div className="error-msg">{pdfFileError}</div>
                )}
                <button
                  type="submit"
                  className="editBtn w-64 h-10 bg-transparent text-lg text-white font-bold rounded-full border-2 over:border-[#5068F2] border-white hover:bg-white hover:text-[#5068F2]"
                >
                  Edit a PDF
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center text-center md:px-6 px-0 z-0 relative">
          <img src={MaskOne} alt="mask" className="absolute top-0" />
          <div className="absolute mx-auto top-2 z-20 text-center w-full">
            <h1 className="rightTitle text-3xl text-white font-semibold lg:text-black">
              PDF Editor
            </h1>
            <p className="py-2 space-x-2 text-white lg:text-black text-xl">
              Edit PDF files. Fill & sign PDF
            </p>
          </div>
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          {viewPdf && (
            <div className="editBtn absolute mx-auto flex items-center top-24 gap-6">
              <button className="h-8 w-24 rounded-lg bg-[#5569F7] text-white">
                Text
              </button>
              <button className="h-8 w-24 rounded-lg bg-[#5569F7] text-white">
                Image
              </button>
            </div>
          )}
          <div className="editText flex flex-col md:flex-row justify-center items-center gap-1 w-full h-[500px] mt-20 z-20 relative">
            {viewPdf && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={viewPdf}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}
            {!viewPdf && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  required
                  onChange={handlePdfFileChange}
                />
                <p className="title lg:text-black text-md text-white">
                  TECHNICAL TEST FOR FRONTEND DEVELOPER
                </p>
                <span
                  onClick={handleSpanClick}
                  className="edit text-md text-[#5068F2] hover:underline cursor-pointer"
                >
                  Import a PDF
                </span>
              </>
            )}
          </div>
          {viewPdf && (
            <div className="exportBtn absolute bottom-4 right-6">
              <button className="h-10 w-32 rounded-md bg-[#5569F7] text-white">
                Export
              </button>
            </div>
          )}
          <img src={MaskTwo} alt="mask" className="absolute bottom-0" />
        </div>
      </section>
    </>
  );
}

export default App;
