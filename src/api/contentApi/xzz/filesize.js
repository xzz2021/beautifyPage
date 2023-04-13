


const caculateFileSize = (size) => {
    return size < 0 ? "未知大小" : size < 1024 ? size + "B" : size < 1024 * 1024 ? (size / 1024).toFixed(1) + "KB" : (size / (1024 * 1024)).toFixed(2) + "MB"
}

export default { caculateFileSize }