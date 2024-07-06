function downloadTsxFile(componentName: string, componentCode: string) {
  const temporaryEl = document.createElement("a");
  const blob = new Blob([componentCode], {
    type: "text/plain;charset=utf-8",
  });
  const blobUrl = window.URL.createObjectURL(blob);

  temporaryEl.href = blobUrl;
  temporaryEl.download = `${componentName}.tsx`;
  temporaryEl.click();

  window.URL.revokeObjectURL(blobUrl);
}

export default downloadTsxFile;
