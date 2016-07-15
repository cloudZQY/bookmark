export function isFolder(item) {
  if (item.dateGroupModified) {
    return true;
  } 
  return false;
}