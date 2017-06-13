class DataListWrapper {
  constructor(indexMap, data) {
    this.indexMap = indexMap;
    this.data = data;
  }

  getSize() {
    return this.indexMap.length;
  }

  getObjectAt(index) {
    const sortedIndex = this.indexMap[index];
    return this.data[sortedIndex];
  }

  getObjectAtSorted(index) {
    return this.data[index];
  }
}

export default DataListWrapper;
