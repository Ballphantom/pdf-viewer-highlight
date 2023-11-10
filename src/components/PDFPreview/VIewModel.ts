import { useState, useEffect } from "react";
import { searchPlugin } from "@react-pdf-viewer/search";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/bookmark/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";

export const usePDFDocumentViewModel = (keyword: string) => {
  const bookmarkPluginInstance = bookmarkPlugin();
  const searchPluginInstance = searchPlugin();
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const handleDocmentLoad = () => setIsDocumentLoaded(true);
  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.TextSelection,
  });

  useEffect(() => {
    if (isDocumentLoaded && keyword) {
      console.log(keyword);
      searchPluginInstance.highlight({
        keyword,
      });
    } else if (!keyword) {
      searchPluginInstance.clearHighlights();
    }
  }, [keyword, isDocumentLoaded]);

  return {
    highlightPluginInstance,
    bookmarkPluginInstance,
    searchPluginInstance,
    isDocumentLoaded,
    handleDocmentLoad,
  };
};

