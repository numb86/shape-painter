export const load = (
  e: React.ChangeEvent<HTMLInputElement>
): Promise<any | undefined> => {
  return new Promise((resolve) => {
    if (!e.target.files) {
      resolve();
      return;
    }

    const file = e.target.files[0];

    // What to do if user cancel in the file upload dialog
    if (!file) {
      resolve();
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const restoredData = JSON.parse(reader.result as string);
      resolve(restoredData);
    };
  });
};
