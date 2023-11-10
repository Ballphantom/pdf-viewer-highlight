import { useState } from "react";
import { fetchPDFData } from "../../service/API/PDFAPI";

export const useViewModel = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [fetchedPdfData, setFetchedPdfData] = useState<string | null>(null);

  const handleKeywordClick = async (keyword: string) => {
    setSelectedKeyword(keyword);
    if (fetchedPdfData) {
      setPdfPath(fetchedPdfData);
    } else {
      const url = await fetchPDFData();
      if (url) {
        setPdfPath(url);
        setFetchedPdfData(url);
      } else {
        setPdfPath(null);
        setFetchedPdfData(null);
      }
    }
  };

  const handleClosePdf = () => {
    setSelectedKeyword(null);
    setPdfPath(null);
    setFetchedPdfData(null);
  };

  const handleDownloadPdf = async () => {
    try {
      if (pdfPath) {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.setAttribute('download', 'sample.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);       
      }
    } catch (error) { 
      console.error('Error downloading PDF:', error);
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