import async from 'async';
export function isFolder(item) {
  if (item.dateGroupModified) {
    return true;
  } 
  return false;
}

export function getFolder(list, id, callback) {
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
  if(typeof callback === 'function') {
    callback(loopChildren(list));
  }
  return loopChildren(list);
}

export const createDefaultMode = (bookmarks) => new Promise((resolve, reject) => {
  chrome.bookmarks.getTree(nodeTree => {
    getFolder(nodeTree , '3', function (node) {
      let bm = node.children.find((child) => {
        return child.title === 'cloudBM'
      });
      if (!bm) {
        chrome.bookmarks.create({
          parentId: '3',
          index: 0,
          title: 'cloudBM',
        }, (bm) => {
          chrome.bookmarks.create({
            parentId: bm.id,
            index: 0,
            title: '默认'
          }, () => {
            resolve(bm)
          })
        })
      } else {
        if (!bm.children || !bm.children.find((child) => {
            return child.title === '默认' && child.index === 0;
          })) {
          chrome.bookmarks.create({
            parentId: bm.id,
            index: 0,
            title: '默认'
          }, () => {
            resolve(bm);
          })
        } else {
          resolve(bm);
        }
      }
    })
  })
})

// 移动某id的文件夹下的书签到另一个id的文件夹下
export const moveFolder = (originId, targetId) => {
  return new Promise((resolve, reject) => {
    saveFolder(originId).then(bookmarks => {
      moveFolderFromArray(bookmarks, targetId).then(() => {
        resolve();
      })
    })
  })
}


// 交换两个文件夹 
export const exchangeFolder = (originId, targetId) => {
  return new Promise((resolve, reject) => {
    saveFolder(originId).then(oBookmarks => {
      saveFolder(targetId).then( tBookmarks => {
        moveFolderFromArray(oBookmarks, targetId).then(() => {
          moveFolderFromArray(tBookmarks, originId).then(() => {
            resolve();
          })
        })
      })
    })
  })
}

// 复制文件夹
export const copyFolderToMain = (originId, targetId) => {
  return new Promise((resolve, reject) => {
    saveFolder(originId).then(bookmarks => {
      copyFolderFromArray(bookmarks, targetId).then(() => {
        resolve();
      })
    })
  })
}

export const clearFolder = (id) => {
  return new Promise((resolve, reject) => {
    saveFolder(id).then(bookmarks => {
      async.series(
        bookmarks.map(child => {
          return cb => {
            chrome.bookmarks.remove(child.id, () => cb())
          }
        }).concat([() => resolve()])
      )
    })
  })
}

// 根据数组信息移动文件夹下所有书签
const moveFolderFromArray = (bookmarks,targetId) => {
  return new Promise((resolve, reject) => {
    async.series(
      bookmarks.map(child => {
        return cb => {
          chrome.bookmarks.move(child.id, {
            parentId: targetId,
            index: child.index
          }, () => cb())
        }
      }).concat([(cb) => {
        resolve();
        cb();
      }])
    )
  })
}

const copyFolderFromArray = (bookmarks,targetId) => {
  return new Promise((resolve, reject) => {
    async.series(
      bookmarks.map(child => {
        return cb => {
          chrome.bookmarks.create({
            parentId: targetId,
            index: child.index,
            title: child.title,
            url: child.url
          }, () => cb())
        }
      }).concat([(cb) => {
        resolve();
        cb();
      }])
    )
  })
}

// 讲指定id的书签保存为一个数组
export const saveFolder = id => {
  return new Promise((resolve, reject) => {
    let bookmarks = [];
    chrome.bookmarks.getTree(nodeTree => {
      getFolder(nodeTree, id, folder => {
        folder.children.map(child => {
          bookmarks.push({
            id: child.id,
            index: child.index,
            title: child.title,
            url: child.url,
          })
        })
        resolve(bookmarks);
      })
    })
  })
}



// export const moveBookmark = (id, parentId, index) => 
//   new Promise((resolve, reject) => {
//     chrome.bookmarks.move(id, {parentId, index}, ()=> {
//       resolve();
//     })
//   }
// )