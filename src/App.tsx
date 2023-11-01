import { useState } from "react";
import PDFViewer from "./components/PdfPreview";

const App = () => {
  const [selectedKeyword, setSelectedKeyword] = useState("");

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const handleClosePdf = () => {
    setSelectedKeyword("");
  };

  return (
    <div className="page">
      <div className="content">
        <div className="content-header">
          <h1>Sample PDF Highlighter</h1>
          <h3>Click at topic list</h3>
        </div>
        <div className="content-body">
            <p
              className="search-words"
              onClick={() =>
                handleKeywordClick("Accessing the novaPDF Printing Preferences")
              }
            >
              Accessing the novaPDF Printing Preferences
            </p>
            <p
              className="search-words"
              onClick={() =>
                handleKeywordClick("How to create PDF files from Microsoft Word")
              }
            >
              How to create PDF files from Microsoft Word
            </p>
        </div>
      </div>
      <div className="pdf">
        <PDFViewer keyword={selectedKeyword} onClose={handleClosePdf} />
      </div>
    </div>
  );
};

export default App;
