export const closeSidebar = () => ({
  type: 'CLOSE_SIDEBAR',
});

export const openSidebar = () => ({
  type: 'OPEN_SIDEBAR',
});

export const toggleValueCount = () => ({
  type: 'TOGGLE_VALUE_COUNT',
});

export const updateTreeData = (value) => ({
  type: 'UPDATE_TREE_DATA',
  value,
});
