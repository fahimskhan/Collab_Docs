export const onChange = (editorState) => {
  return {
    type: 'ON_CHANGE',
    editorState,
  }
}
