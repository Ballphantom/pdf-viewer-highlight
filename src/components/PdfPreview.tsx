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
  HighlightRect,
  PDFViewerProps,
} from "../interfaces/PDFHighlighter/types";
const PDFViewer: React.FC<PDFViewerProps> = ({ keyword, pdfPath, onClose }) => {
  const [highlightAreas, setHighlightAreas] = useState<HighlightRect[]>([]);

  useEffect(() => {
    const areas: HighlightRect[] = [
      {
        top: 250,
        left: 170,
        width: 210,
        height: 90,
      },
    ];
    setHighlightAreas(areas);
  }, [keyword]);

  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const handleDocmentLoad = () => setIsDocumentLoaded(true);
  const searchPluginInstance = searchPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();
  const renderHighlights = (props: any) => (
    <div>
      {highlightAreas
        .filter((area) => area.top === props.pageIndex)
        .map((area, idx) => (
          <div
            key={idx}
            className="highlight-area"
            style={{
              position: "absolute",
              top: area.top,
              left: area.left,
              width: area.width,
              height: area.height,
              backgroundColor: "red",
              opacity: 0.4,
            }}
          />
        ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlights,
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
