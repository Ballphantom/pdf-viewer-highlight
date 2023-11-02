import { IPDFData } from "../interfaces/PDF/types";
import sample1 from "../assets/sample.pdf";
import sample2 from "../assets/pdf-example-bookmarks.pdf";

export const PDF: IPDFData[] = [
  { id: 1, name:'sample1', path: sample1 },
  { id: 2, name:'sample2', path: sample2 },
];
