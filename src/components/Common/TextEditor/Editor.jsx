
import React, { useState } from 'react';
import EditorJS from '@stfy/react-editor.js';
import { EDITOR_JS_TOOLS } from './editorTools';
import Undo from 'editorjs-undo';
import DragDrop from 'editorjs-drag-drop';

const Editor = ({ data, holder = 'editorjs-container' }) => {
  const [editor, editorUpdater] = useState(null);
  const handleReady = () => {
    if (editor && editor.configuration) {
      const temp = document.getElementById(editor.configuration.holder);
      editor.configuration.holder = temp;

      new Undo({ editor });
      new DragDrop(editor);
    }
  };
  return (
    <div>
      <EditorJS
        ref={ref => { if (ref) { editorUpdater(ref.editor); } }}
        holder={holder} tools={EDITOR_JS_TOOLS} onData={(data) => console.log(data)}
        readOnly
        data={JSON.parse(data)} onReady={handleReady}
      />
      {/* <Output data={data} renderers={{ header: testConfig }} /> */}
    </div>
  );
};
export default Editor;
