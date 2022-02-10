function getFileSize(fileSize) {
  const size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const base = 1024;

  let res = 0;

  for (let i = 0; i < size.length; i++) {
    if (fileSize < base) {
      res = fileSize + size[0];
    } else {
      if (fileSize < Math.pow(base, i + 1) && fileSize >= Math.pow(base, i)) {
        res = (fileSize / Math.pow(base, i)).toFixed(2) + size[i];
      }
    }
  }

  return res;
}

// 文件切片
function slice(file, size = 1024 * 1024 * 2) {
  const blob = new Blob([file], {
    type: file.type,
  });
  const count = Math.ceil(blob.size / size);
  const result = [];

  for (let i = 0; i < count; i++) {
    const start = i === 0 ? i * size : i * size + 1;
    const end = i * size + size;

    console.log(start, end)
    const chunk = blob.slice(start, end, blob.type);

    result.push(chunk);
  }

  return result;
}

/**
 * @description promise 并发控制
 * @param {*} promiseList
 * @param {*} limit
 * @returns Promise
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Concurrent = (promiseList, limit = 3) => {
  let current = 0;

  const result = [];
  const total = promiseList.length;
  const max = Math.ceil(total / limit);

  const run = (start = 0, end = 3) => {
    console.log('run');
    return new Promise((resolve) => {
      for (let i = start; i < end && i < total; i++) {
        promiseList[i]
          .then((res) => {
            console.log(current);
            result[i] = {
              type: 'success',
              data: res,
            };
          })
          .catch((err) => {
            result[i] = {
              type: 'error',
              error: err,
            };
          })
          .finally(() => {
            current++;
            console.log(`执行第 ${current} 个`);
            if (current >= total) resolve();
          });
      }
    });
  };

  return new Promise((resolve) => {
    for (let i = 0; i < max; i++) {
      run(i * limit, i * limit + limit).then(() => {
        console.log(result);
        resolve(result);
      });
    }
  });
};
