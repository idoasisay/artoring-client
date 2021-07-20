import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
// import SimpleImage from '@editorjs/simple-image';
import createGenericInlineTool, {
  ItalicInlineTool,
  UnderlineInlineTool,
  StrongInlineTool
} from 'editorjs-inline-tool';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import anyButton from 'editorjs-button';
import ColorPlugin from 'editorjs-text-color-plugin';

export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: {
          regex: /https?:\/\/youtube.com\//,
          embedUrl: 'https://youtube.com/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
          html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
          height: 300,
          width: 600,
          id: (groups) => groups.join('/embed/')
        }
      }
    },
    inlineToolbar: true
  },
  table: Table,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ['actionsClassNames']
  },
  header: {
    class: Header,
    tunes: ['actionsClassNames']
  },

  italic: ItalicInlineTool,
  underline: UnderlineInlineTool,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    tunes: ['actionsClassNames']
  },
  raw: Raw,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  actionsClassNames: {
    class: AlignmentTuneTool,
    config: {
      default: 'left'
    }
  },
  AnyButton: {
    class: anyButton,
    inlineToolbar: false,
    config: {
      css: {
        btnColor: 'btn-#ffffff'
      }
    }
  },
  Color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections:
[
  '#E6B8AF', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
  '#DD7E6B', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
  '#CC4125', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
  '#A61C00', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
  '#85200C', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
  '#5B0F00', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
],
      type: 'text'
    }
  },
  Marker: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections:
[
  '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
  '#DD7E6B', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
  '#CC4125', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
  '#A61C00', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
  '#85200C', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
  '#5B0F00', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
],
      defaultColor: '#FFBF00',
      type: 'marker'
    }
  }

}
;
