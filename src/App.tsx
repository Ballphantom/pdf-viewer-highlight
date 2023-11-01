import { useState } from "react";
import PDFViewer from "./components/PdfPreview";

const App = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const handleClosePdf = () => {
    setSelectedKeyword(null);
  };

  const topicList = [
    "Accessing the novaPDF Printing Preferences",
    "How to create PDF files from Microsoft Word",
  ];

  return (
    <div className="page">
      <div className="content">
        <div className="content-header">
          <h1>Sample PDF Highlighter</h1>
          <h3>Click at topic list</h3>
        </div>
        <div className="content-body">
          {topicList.map((topic, index) => (
            <p className="search-words" key={index} onClick={() => handleKeywordClick(topic)}>
              {topic}
            </p>
          ))}
        </div>
      </div>
      <div className="pdf">
        {selectedKeyword && <PDFViewer keyword={selectedKeyword} onClose={handleClosePdf} />}
      </div>
    </div>
  );
};

export default App;
