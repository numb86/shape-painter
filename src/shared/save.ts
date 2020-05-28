export const save = (data: any, prefix: string) => {
  const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const elem = document.createElement('a');
  elem.href = url;
  elem.download = `${prefix}-${new Date().toISOString()}.json`;
  elem.click();
  URL.revokeObjectURL(url);
};
