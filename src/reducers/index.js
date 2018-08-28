import { EditorState } from 'draft-js';

const initState = {
  editorState: EditorState.createEmpty(),
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        editorState: action.editorState,
      }
    default:
      return state;
  }
};
