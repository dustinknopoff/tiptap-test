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
import html2canvas from "html2canvas";
import Moveable from "react-moveable";
import React from "react";

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
    onSelectionUpdate: ({ editor }) => {
      paintText(editor.getHTML(), { width: "400", height: "200" }, "a");
      const imgsrc = window.textImageCanvas.toDataURL("image/png");
      let img = new Image();
      img.src = imgsrc;
      img.width = "500px";
      img.height = "500px";
      document.querySelector("#main").appendChild(img);
      console.log(editor.getMarkAttributes("textStyle"));
    },
    onUpdate: ({ editor }) => console.log(editor.getJSON()),
  });

  const [target, setTarget] = React.useState();
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: "50% 50%",
  });
  React.useEffect(() => {
    setTarget(document.querySelector("#img"));
  }, []);

  return (
    <React.Fragment>
      <Moveable
        target={target}
        container={document.querySelector(".container")}
        resizable={true}
        snappable={true}
        bounds={{ left: 40, right: 1048, top: 40, bottom: 800 }}
        elementGuidelines={[document.querySelector(".ProseMirror")]}
        keepRatio={true}
        throttleResize={0}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={false}
        zoom={1}
        rotationPosition={"top"}
        origin={true}
        originDraggable={true}
        originRelative={true}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        rotatable={true}
        throttleRotate={0}
        onResizeStart={(e) => {
          e.setOrigin(["%", "%"]);
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onResize={(e) => {
          const beforeTranslate = e.drag.beforeTranslate;
          frame.translate = beforeTranslate;
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onDragOriginStart={(e) => {
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onDragOrigin={(e) => {
          frame.translate = e.drag.beforeTranslate;
          frame.transformOrigin = e.transformOrigin;
        }}
        onDragStart={(e) => {
          e.set(frame.translate);
        }}
        onDrag={(e) => {
          frame.translate = e.beforeTranslate;
          if (target) target.style.transform = e.transform;
        }}
      />
      <div className="App" id="main">
        <button
          onClick={() => editor.chain().focus().setFontColor("orange").run()}
        >
          Orange selected
        </button>
        <TipTap editor={editor} />
        <div class="container" width={"800px"} height="880px">
          <img
            src="https://91b6be3bd2294a24b7b5-da4c182123f5956a3d22aa43eb816232.ssl.cf1.rackcdn.com/contentItem-14582611-140057779-ekk24p8b42exw-or.jpg"
            width="500"
            height="500"
            alt="testing"
            id="img"
          />
        </div>
        <button
          onClick={(e) => {
            html2canvas(document.getElementById("main"), {
              allowTaint: true,
              useCORS: true,
            }).then((canvas) => {
              const imgsrc = canvas.toDataURL("image/png");
              let img = new Image();
              img.crossOrigin = "anonymous";
              img.src = imgsrc;
              img.width = "500";
              img.height = "500";
              document.querySelector("#main").appendChild(img);
            });
          }}
        >
          Take a pic
        </button>
      </div>
    </React.Fragment>
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
                fontColor: "black",
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
                fontColor: "black",
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
                fontColor: "black",
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
                fontColor: "black",
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
                fontColor: "black",
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

/**
 *
 * @param {string} html HTML text from ProseMirror
 * @param {{width: number, height: number}} size dimensions
 * @param {string} id
 */
function paintText(html, size, id) {
  if (!window.textImageCanvas) {
    console.log(size);
    window.textImageCanvas = document.createElement("canvas");
    window.textImageCanvas.id = id;
    window.textImageCanvas.height = size.width;
    window.textImageCanvas.width = size.height;
  }
  console.log(window.textImageCanvas);
  var ctx = window.textImageCanvas.getContext("2d");

  var data =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}px" height="${size.height}px">` +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml">' +
    `${html}` +
    "</div>" +
    "</foreignObject>" +
    "</svg>";

  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svg = new Blob([data], {
    type: "image/svg+xml;charset=utf-8",
  });
  var url = DOMURL.createObjectURL(svg);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  };

  img.src = url;
}
