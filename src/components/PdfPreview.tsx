import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import { searchPlugin } from "@react-pdf-viewer/search";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import "@react-pdf-viewer/bookmark/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import {
  PDFViewerProps,
} from "../interfaces/PDFHighlighter/types";
const PDFViewer: React.FC<PDFViewerProps> = ({ keyword, pdfPath, onClose }) => {

  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const handleDocmentLoad = () => setIsDocumentLoaded(true);
  const searchPluginInstance = searchPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();

  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.TextSelection,
  });

  useEffect(() => {
    if (isDocumentLoaded && keyword) {
      searchPluginInstance.highlight({
        keyword,
      });
    } else if (!keyword) {
      searchPluginInstance.clearHighlights();
    }
  }, [keyword, isDocumentLoaded]);

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

export default PDFViewer;
