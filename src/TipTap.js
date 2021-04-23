import { EditorContent } from "@tiptap/react";

const Tiptap = ({ editor }) => {
  if (!editor) return null;
  const prose = Array.from(document.getElementsByClassName("ProseMirror"))[0];
  if (prose) {
    prose.style.width = "400px";
    prose.style.position = "absolute";
    prose.style.top = "40px";
    prose.style.left = "300px";
    prose.style.border = "2px solid blue";
  }

  return <EditorContent editor={editor} />;
};

export default Tiptap;
