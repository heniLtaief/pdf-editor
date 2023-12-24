import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getFilePlugin } from "@react-pdf-viewer/get-file";

const PdfView = ({ viewPdf }) => {
  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={viewPdf} plugins={[getFilePluginInstance]} />
      </Worker>
      {viewPdf && (
        <Download>
          {(props) => (
            <button
              onClick={props.onClick}
              className="exportBtn absolute -bottom-12 z-30 right-0 h-10 w-32 rounded-md bg-[#5569F7] text-white"
            >
              Export
            </button>
          )}
        </Download>
      )}
    </>
  );
};

export default PdfView;
