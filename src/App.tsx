import { useState } from 'react';
import PDFViewer from './components/PdfPreview';

const App = () => {
    const [showPdf, setShowPdf] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState('');

    const handleKeywordClick = (keyword: string) => {
        setSelectedKeyword(keyword);
        setShowPdf(true);
    };

    const handleClosePdf = () => {
        setShowPdf(false);
        setSelectedKeyword('');
    };

    return (
        <div>
            <h1>Sample PDF Highlighter</h1>
            <p className="search-words" onClick={() => handleKeywordClick('Creating PDF Files')}>Click to toggle pdf</p>
            {/* Other clickable keywords */}
            {showPdf && (
                <PDFViewer
                    keyword={selectedKeyword}
                    onClose={handleClosePdf}
                />
            )}
        </div>
    );
};

export default App;
