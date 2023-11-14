import { Worker, Viewer } from "@react-pdf-viewer/core";
import { usePDFDocumentViewModel } from "./ViewModel";
import {
  PDFViewerProps,
} from "../../interfaces/PDFHighlighter/types";
import { useState } from "react";

const PDFDocumentView = ({ keyword, pdfPath, onClose }: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { handleDocmentLoad, searchPluginInstance, bookmarkPluginInstance, highlightPluginInstance } = usePDFDocumentViewModel(keyword);

  return (
    <div className="pdf-container">
      <div className="pdf-header">
        <button className="btn-clear close" onClick={onClose}>
          Close PDF
        </button>
        <button
          className="btn-clear"
          onClick={() => {
            searchPluginInstance.clearHighlights();
          }}
        >
          Clear highlight
        </button>
      </div>
      <div className="h-[100vh] w-full">
        {isLoading && <div className="text-4xl font-semibold text-center">Loading...</div>}
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          {pdfPath && (
            <Viewer 
            onDocumentLoad={() => {
              setIsLoading(false);
              handleDocmentLoad();
            }}
              fileUrl={pdfPath}
              plugins={[
                highlightPluginInstance,
                searchPluginInstance,
                bookmarkPluginInstance,
              ]}
            />
          )}
        </Worker>
      </div>
    </div>
  );
};

export default PDFDocumentView;