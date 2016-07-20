export function isFolder(item) {
  if (item.dateGroupModified) {
    return true;
  } 
  return false;
}

export function getFolder(list, id) {
  const getResult = list => list.find((item) => item.id === id);
  
  const loopChildren = list => {
    let result;
    if (result = getResult(list)) {
      return result;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].children && (result = loopChildren(list[i].children))) {
        return result;
      }
    }
  }
  return loopChildren(list);
}