import { Command, Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

type FontColorOptions = {
  types: string[];
};

declare module "@tiptap/core" {
  interface Commands {
    fontColor: {
      /**
       * Set the font family
       */
      setFontColor: (fontColor: string) => Command;
      /**
       * Unset the font family
       */
      unsetFontColor: () => Command;
    };
  }
}

export const fontColor = Extension.create<FontColorOptions>({
  name: "fontColor",

  defaultOptions: {
    types: ["textStyle"],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontColor: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.fontColor) {
                return {};
              }

              return {
                style: `color: ${attributes.fontColor}`,
              };
            },
            parseHTML: (element) => ({
              fontColor: element.style.color,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontColor: (fontColor) => ({ chain }) => {
        return chain().setMark("textStyle", { fontColor }).run();
      },
      unsetFontColor: () => ({ chain }) => {
        return chain()
          .setMark("textStyle", { fontColor: null })
          .removeEmptyTextStyle()
          .run();
      },
    };
  },
});

export default fontColor;
