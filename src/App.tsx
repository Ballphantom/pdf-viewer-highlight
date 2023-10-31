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
    <div>
      <h1>Sample PDF Highlighter</h1>
      <h3>Click at topic list</h3>
      <ul>
        <li
          className="search-words"
          onClick={() =>
            handleKeywordClick("Accessing the novaPDF Printing Preferences")
          }
        >
          Accessing the novaPDF Printing Preferences
        </li>
        <li
          className="search-words"
          onClick={() =>
            handleKeywordClick("How to create PDF files from Microsoft Word")
          }
        >
          How to create PDF files from Microsoft Word
        </li>
      </ul>
      <PDFViewer keyword={selectedKeyword} onClose={handleClosePdf} />
    </div>
  );
};

export default App;
