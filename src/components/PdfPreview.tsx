import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import { searchPlugin, OnHighlightKeyword } from "@react-pdf-viewer/search";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import "@react-pdf-viewer/bookmark/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import sample from "../assets/pdf-example-bookmarks.pdf";
import { HighlightRect, PDFViewerProps } from "../interfaces/types";

const PDFViewer = ({ keyword }: PDFViewerProps) => {
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
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      searchPlugin: {
        onHighlightKeyword: (props: OnHighlightKeyword) => {
          const { keyword } = props;
          searchPluginInstance.highlight(keyword);
        },
      },
    },
  });
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
              background: "yellow",
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
    <div className="pdf-containter">
      <div className="pdf-header"></div>
      <div>
        <button
          className="btn-clear"
          onClick={() => {
            searchPluginInstance.clearHighlights();
          }}
        >
          Clear highlight
        </button>
      </div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          onDocumentLoad={handleDocmentLoad}
          fileUrl={sample}
          plugins={[
            defaultLayoutPluginInstance,
            highlightPluginInstance,
            searchPluginInstance,
            bookmarkPluginInstance,
          ]}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
