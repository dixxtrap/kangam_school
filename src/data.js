import mathImg from "./assets/photo/photo4.jpg";
import francaisImg from "./assets/photo/photo4.jpg";
import ProbabilityImg from "./assets/photo/photo4.jpg";
import physiqueImg from "./assets/photo/photo4.jpg";
import chimieImg from "./assets/photo/photo4.jpg";
import phyloImg from "./assets/photo/photo4.jpg";
import anglaisImg from "./assets/photo/photo4.jpg";
import svtImg from "./assets/photo/photo4.jpg";
import infoImg from "./assets/photo/photo4.jpg";
import dessinImg from "./assets/photo/photo4.jpg";
import musicImg from "./assets/photo/photo4.jpg";

const matterData = [
  "Tout",
  "Informatiques",
  "Mathematiques",
  "Probabilite",
  "Physique",
  "Chimie",
  "Phylosphie",
  "Francais",
  "Anglais",
  "SVT",
  "Dessin",
  "Musique",
];
export const matterDataImg = {
  informatiques: infoImg,
  mathematiques: mathImg,
  probabilite: ProbabilityImg,
  physique: physiqueImg,
  chimie: chimieImg,
  phylosphie: phyloImg,
  francais: francaisImg,
  anglais: anglaisImg,
  svt: svtImg,
  dessin: dessinImg,
  musique: musicImg,
};
export { matterData };
const priceData = [
  "5000",
  "10000",
  "12500",
  "15000",
  "17500",
  "20000",
  "22500",
  "25000",
  "27500",
  "30000",
];
const primary = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};
const levelData = [
  "Tout",
  "CI",
  "CP",
  "CE1",
  "CE2",
  "CM1",
  "CFEE",
  "6 eme",
  "5 eme",
  "4 eme",
  "BFEM",
  "Second",
  "Premiere",

  "BAC",
  "Licence",
  "Master",
];
const draftData = {
  options: [
    "inline",
    // "blockType",
    // "fontSize",
    // "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    // "link",
    // "embedded",
    // "emoji",
    // "image",
    // "remove",
    // "history",
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      // "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
    bold: {
      //    icon: bold,
      className: undefined,
    },
    italic: {
      //    icon: italic,
      className: undefined,
    },
    underline: {
      //   icon: underline,
      className: undefined,
    },
    strikethrough: {
      //   icon: strikethrough,
      className: undefined,
    },
    monospace: {
      //   icon: monospace,
      className: undefined,
    },
    superscript: {
      // icon: superscript,
      className: undefined,
    },
    subscript: {
      //   icon: subscript,
      className: undefined,
    },
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    //   icon: fontSize,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered", "indent", "outdent"],
    unordered: {
      //    icon: unordered,
      className: undefined,
    },
    ordered: {
      //   icon: ordered,
      className: undefined,
    },
    indent: {
      //    icon: indent,
      className: undefined,
    },
    outdent: {
      //   icon: outdent,
      className: undefined,
    },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
    left: {
      //   icon: left,
      className: undefined,
    },
    center: {
      //    icon: center,
      className: undefined,
    },
    right: {
      //    icon: right,
      className: undefined,
    },
    justify: {
      //   icon: justify,
      className: undefined,
    },
  },
};
const choiceData = [
  { label: "Tout", value: "tout" },
  { label: "Aimé", value: "like" },
  { label: "Acheté", value: "buy" },
  { label: "commenté", value: "comment" },
];

const draftDataList = {
  options: [
    "inline",
    // "blockType",
    // "fontSize",
    // "fontFamily",
    "list",
    // "textAlign",
    "colorPicker",
    // "link",
    // "embedded",
    // "emoji",
    // "image",
    // "remove",
    // "history",
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      // "italic",
      "underline",
      // "strikethrough",
      "monospace",
      // "superscript",
      // "subscript",
    ],
    bold: {
      //    icon: bold,
      className: undefined,
    },
    italic: {
      //    icon: italic,
      className: undefined,
    },
    underline: {
      //   icon: underline,
      className: undefined,
    },
    strikethrough: {
      //   icon: strikethrough,
      className: undefined,
    },
    monospace: {
      //   icon: monospace,
      className: undefined,
    },
    superscript: {
      // icon: superscript,
      className: undefined,
    },
    subscript: {
      //   icon: subscript,
      className: undefined,
    },
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      // "H1",
      // "H2",
      // "H3",
      "H4",
      "H5",
      "H6",
      // "Blockquote",
      // "Code",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    //   icon: fontSize,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
    unordered: {
      //    icon: unordered,
      className: undefined,
    },
    ordered: {
      //   icon: ordered,
      className: undefined,
    },
    indent: {
      //    icon: indent,
      className: undefined,
    },
    outdent: {
      //   icon: outdent,
      className: undefined,
    },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
    left: {
      //   icon: left,
      className: undefined,
    },
    center: {
      //    icon: center,
      className: undefined,
    },
    right: {
      //    icon: right,
      className: undefined,
    },
    justify: {
      //   icon: justify,
      className: undefined,
    },
  },
};
// Calender

const MonthData = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const getDate = (d, datetime) => {
  const day = new Date(
    datetime ? d : parseInt(d.seconds + d.nanoseconds / 10 ** 9) * 1000
  );
  return day;
};
export {
  primary,
  priceData,
  levelData,
  draftData,
  choiceData,
  draftDataList,
  getDate,
  MonthData,
};
