export interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface PDFViewerProps {
  keyword: string;
  onClose: () => void;
}

