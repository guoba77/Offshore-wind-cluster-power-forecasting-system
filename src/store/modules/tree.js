const tree = {
  state: {
    treeLabel: '',
    subSationList: {},
    showChars: false
  },

  mutations: {
    SET_LABEL: (state, n) => {
      tree.state.treeLabel = n
    },
    SET_LIST: (state, n) => {
      tree.state.subSationList = n
    },
    SET_CHARS: (state, n) => {
      tree.state.showChars = n
    }
  }
}

export default tree
