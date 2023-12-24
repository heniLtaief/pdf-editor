import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import BgImage from "./assets/background.png";
import Logo from "./assets/logo.png";
import MaskOne from "./assets/mask1.png";
import MaskTwo from "./assets/mask2.png";
import EditButtons from "./components/EditButtons";
import PdfView from "./components/PdfView";
import RightSectionHeader from "./components/RightSectionHeader";

function App() {
  const [pdfFileError, setPdfFileError] = useState("");

  const [viewPdf, setViewPdf] = useState(null);

  const fileType = ["application/pdf"];

  const fileInputRef = useRef(null);

  const handleSpanClick = () => {
    const newFileInput = document.createElement("input");
    newFileInput.type = "file";
    newFileInput.accept = "application/pdf";

    newFileInput.addEventListener("change", handlePdfFileChange);

    // Trigger a click event on the new input
    newFileInput.click();
  };

  // Import a PDF file
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFileError("");
          setViewPdf(e.target.result);
        };
      } else {
        setPdfFileError("Please select a valid PDF file");
      }
    } else {
      console.log("Select your file");
    }
  };

  // Create text field inputs and  field names
  const handleTextButtonClick = async () => {
    if (viewPdf) {
      try {
        const pdfDoc = await PDFDocument.load(viewPdf);
        const form = pdfDoc.getForm();

        // Adding a text field at a specific location on the first page
        const page = pdfDoc.getPages()[0];
        page.drawText("Name: ", {
          x: 50,
          y: 700,
          size: 20,
        });
        const textField = form.createTextField("custom.text.field");
        textField.setText(""); // Set initial text if needed
        textField.addToPage(page, { x: 120, y: 700 });
        // Save the modified PDF
        const modifiedPdfBytes = await pdfDoc.save();
        // Update the state with the modified PDF
        setViewPdf(modifiedPdfBytes);
      } catch (error) {
        console.error("Error creating form field:", error);
      }
    }
  };

  // Embed an image
  const handleImageButtonClick = async () => {
    if (viewPdf) {
      try {
        const pdfDoc = await PDFDocument.load(viewPdf);

        const page = pdfDoc.getPages()[0];

        // Display a file input for selecting an image from your desktop
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        // Handle the selected image file
        input.addEventListener("change", async (e) => {
          const selectedImage = e.target.files[0];

          if (selectedImage) {
            const imageBytes = await selectedImage.arrayBuffer();
            const embeddedImage = await pdfDoc.embedPng(imageBytes);

            // Adjust the position and size for bottom right for example
            const imageDims = embeddedImage.scale(0.5);
            const xPosition = page.getWidth() - imageDims.width - 20;
            const yPosition = 20;

            page.drawImage(embeddedImage, {
              x: xPosition,
              y: yPosition,
              width: imageDims.width,
              height: imageDims.height,
            });

            // Save the modified PDF
            const modifiedPdfBytes = await pdfDoc.save();

            // Update the state with the modified PDF
            setViewPdf(modifiedPdfBytes);
          }
        });
      } catch (error) {
        console.error("Error adding image:", error);
      }
    }
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

              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  required
                  onChange={handlePdfFileChange}
                />
                <button
                  onClick={handleSpanClick}
                  type="submit"
                  className="editBtn w-64 h-10 bg-transparent text-lg text-white font-bold rounded-full border-2 over:border-[#5068F2] border-white hover:bg-white hover:text-[#5068F2]"
                >
                  Edit a PDF
                </button>
                {pdfFileError && (
                  <div className="error-msg">{pdfFileError}</div>
                )}
              </>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center text-center md:px-6 px-0 z-0 relative">
          <img src={MaskOne} alt="mask" className="absolute top-0" />
          <RightSectionHeader />
          <div className="flex absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
            <div className="absolute bg-black opacity-60 inset-0 z-0">
              {!viewPdf && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    required
                    onChange={handlePdfFileChange}
                  />
                  <button
                    onClick={handleSpanClick}
                    type="submit"
                    className="editBtn w-64 h-10 z-30 mt-96 bg-[#5068F2] text-lg text-white font-bold rounded-full opacity-1 hover:bg-white hover:text-[#5068F2]"
                  >
                    Edit a PDF
                  </button>
                  {pdfFileError && (
                    <div className="error-msg">{pdfFileError}</div>
                  )}
                </>
              )}
            </div>
          </div>
          {viewPdf && (
            <div className="editText flex flex-col md:flex-row justify-center items-center gap-1 border-2 border-gray-700 w-[90%] h-[500px] mt-20 z-20 relative">
              {viewPdf && (
                <div className="editBtn absolute mx-auto z-32 flex items-center -top-12 gap-6">
                  <EditButtons
                    handleTextButtonClick={handleTextButtonClick}
                    handleImageButtonClick={handleImageButtonClick}
                  />
                </div>
              )}
              <PdfView viewPdf={viewPdf} />
            </div>
          )}
          <img src={MaskTwo} alt="mask" className="absolute bottom-0" />
        </div>
      </section>
    </>
  );
}

export default App;
