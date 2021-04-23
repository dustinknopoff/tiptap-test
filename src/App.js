import "./App.css";
import TipTap from "./TipTap";
import { useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import FontSize from "./font-size";
import FontColor from "./font-color";

function App() {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      FontFamily,
      FontSize,
      FontColor,
      History,
      TextAlign,
    ],
    content: doc,
  });

  return (
    <div className="App">
      <button
        onClick={() => editor.chain().focus().setfontColor("orange").run()}
      >
        Orange selected
      </button>
      <TipTap editor={editor} />
    </div>
  );
}

export default App;

const doc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "H",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "HelveticaNeue",
                fontSize: "48px",
                color: "black",
              },
            },
          ],
        },
        {
          type: "text",
          text: "ell",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "HelveticaNeue",
                fontSize: "40px",
                color: "black",
              },
            },
          ],
        },
        {
          type: "text",
          text: "o",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "Impact",
                fontSize: "40px",
                color: "black",
              },
            },
          ],
        },
        {
          type: "text",
          text: "!",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "HelveticaNeue",
                fontSize: "40px",
                color: "black",
              },
            },
          ],
        },
      ],
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      content: [],
      attrs: {
        textAlign: "left",
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "There's more",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "HelveticaNeue",
                fontSize: "40px",
                color: "black",
              },
            },
          ],
        },
        {
          type: "text",
          text: ":)",
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "HelveticaNeue",
                fontSize: "40px",
                fontColor: "#F7931E",
              },
            },
          ],
        },
      ],
      attrs: {
        textAlign: "left",
      },
    },
  ],
};
