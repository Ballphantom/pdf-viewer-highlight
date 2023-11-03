import { Worker, Viewer } from "@react-pdf-viewer/core";
import { usePDFDocumentViewModel } from "./VIewModel";
import {
  PDFViewerProps,
} from "../../interfaces/PDFHighlighter/types";

const PDFDocumentView = ({ keyword, pdfPath, onClose }: PDFViewerProps) => {

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
      <div style={{ height: "100vh", width: "100%" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          {pdfPath && (
            <Viewer
              onDocumentLoad={handleDocmentLoad}
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