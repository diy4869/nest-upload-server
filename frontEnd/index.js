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
    const chunk = blob.slice(start, i * size + size, blob.type);

    result.push(chunk);
  }

  return result;
}
