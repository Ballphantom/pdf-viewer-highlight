// import React, { useState } from 'react';
// import { PdfLoader, PdfHighlighter, Highlight, ScaledPosition } from 'react-pdf-highlighter';
// import sample from '../assets/pdf-example-bookmarks.pdf';

// const PDFHighlighter = () => {
//     const [highlights, setHighlights] = useState<Highlight[]>([]);

//     const renderPdf = (pdfDocument: any) => (
//         <PdfHighlighter
//             pdfDocument={pdfDocument}
//             enableAreaSelection={(event: MouseEvent) => event.altKey}
//             onScrollChange={() => {}}
//             scrollRef={() => {}}
//             onSelectionFinished={(
//                 position: ScaledPosition,
//                 content: { text?: string; image?: string },
//                 hideTipAndSelection: () => void,
//                 transformSelection: () => void
//             ) => {
//                 setHighlights([
//                     ...highlights,
//                     {
//                         position,
//                         content,
//                     },
//                 ]);
//                 hideTipAndSelection();
//             }}
//             highlightTransform={(_highlight: Highlight, index: number) => {
//                 return {
//                     content: _highlight.content,
//                     position: _highlight.position,
//                     comment: {
//                         text: _highlight.content.text,
//                     },
//                 };
//             }}
//         />
//     );

//     return <PdfLoader url={sample} beforeLoad={<div>Loading...</div>} render={renderPdf} />;
// };

// export default PDFHighlighter;
