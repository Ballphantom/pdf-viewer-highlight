import { useState } from "react";
import { fetchPDFData } from "../../service/API/pdfAPI";
import { Observable } from "rxjs";

export const useViewModel = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);

    if (pdfPath) {
      return;
    }

    const urlObservable: Observable<ArrayBuffer | null> = fetchPDFData();
    urlObservable.subscribe({
      next: (arrayBuffer) => {
        if (arrayBuffer) {
          const blob = new Blob([arrayBuffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          setPdfPath(url);
        } else {
          console.error("Error handling keyword click: PDF data is null");
        }
      },
      error: (error) => {
        console.error("Error handling keyword click:", error);
      }
    });
  };

  const handleClosePdf = () => {
    setSelectedKeyword(null);
    setPdfPath(null);
  };

  const handleDownloadPdf = async () => {
    try {
      if (pdfPath) {
        const link = document.createElement("a");
        link.href = pdfPath;
        link.setAttribute("download", "sample.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return {
    selectedKeyword,
    pdfPath,
    handleKeywordClick,
    handleClosePdf,
    handleDownloadPdf,
  };
};
