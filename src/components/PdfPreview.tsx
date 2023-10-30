import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import { searchPlugin } from '@react-pdf-viewer/search';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import '@react-pdf-viewer/bookmark/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import sample from '../assets/pdf-example-bookmarks.pdf';

interface HighlightRect {
    top: number;
    left: number;
    width: number;
    height: number;
}

interface PDFViewerProps {
    keyword: string;
    onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ keyword, onClose }) => {
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

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
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
                            position: 'absolute',
                            top: area.top,
                            left: area.left,
                            width: area.width,
                            height: area.height,
                            background: 'yellow',
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

    return (
        <div className="pdf-containter">
            <div className="pdf-header">
                <h2>PDF Viewer</h2>
                <button onClick={onClose}>Close</button>
            </div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={sample}
                    plugins={[defaultLayoutPluginInstance, highlightPluginInstance, searchPluginInstance, bookmarkPluginInstance]}
                />
            </Worker>
        </div>
    );
};

export default PDFViewer;
