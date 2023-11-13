import { useViewModel } from "./ViewModel";
import PDFViewer from "../../components/PDFPreview";
import { topicList } from "../../constants/Topics";

const Topics = () => {
  const {
    selectedKeyword,
    pdfPath,
    handleKeywordClick,
    handleClosePdf,
    handleDownloadPdf,
  } = useViewModel();

  return (
    <div className="page">
      <div className="content">
        <div className="content-header">
          <h1 className="font-bold text-2xl text-center p-4 m-2">
            Sample PDF Highlighter
          </h1>
          <h3>Click at topic list</h3>
        </div>
        <div className="content-body">
          {topicList.map((topic, index) => (
            <p
              className="search-words"
              key={index}
              onClick={() => {
                handleKeywordClick(topic);
              }}
            >
              {topic}
            </p>
          ))}
        </div>
        <div className="w-full bottom-0 ">
          {pdfPath && (
            <button
              className="w-full bg-blue-400 p-2 text-white inset-x-0 bottom-0 hover:bg-blue-500 focus:outline-none"
              onClick={handleDownloadPdf}
            >
              Download PDF
            </button>
          )}
        </div>
      </div>
      <div className="pdf">
        {pdfPath && selectedKeyword && (
          <PDFViewer
            keyword={selectedKeyword}
            onClose={handleClosePdf}
            pdfPath={pdfPath}
          />
        )}
      </div>
    </div>
  );
};

export default Topics;
