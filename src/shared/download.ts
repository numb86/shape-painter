import {
  DOWNLOAD_TARGET_ELEMENT_ID,
  DISPLAY_AREA_ELEMENT_ID,
} from '@src/constants';

const SIDE_MARGIN = 20;

let height = 0;
let width = 0;
let canvasXOffset = 0;

const calculateSizeAndPositionOfTree = (
  downloadTargetElement: HTMLElement,
  displayAreaElement: HTMLElement
) => {
  const divArray = Array.from(displayAreaElement.querySelectorAll('div'));

  const positions = divArray.map((item) => ({
    top: item.offsetTop,
    bottom: item.offsetTop + item.offsetHeight,
    left: item.offsetLeft,
    right: item.offsetLeft + item.offsetWidth,
  }));

  const topOfContent = Math.min(...positions.map((position) => position.top));
  const bottomOfContent = Math.max(
    ...positions.map((position) => position.bottom)
  );

  // Add the same margin as the top to the bottom
  height = bottomOfContent + topOfContent;

  const leftMargin = Math.min(...positions.map((position) => position.left));
  canvasXOffset = downloadTargetElement.offsetLeft + (leftMargin - SIDE_MARGIN);

  const rightOfContent = Math.max(
    ...positions.map((position) => position.right)
  );
  width = rightOfContent + SIDE_MARGIN - (leftMargin - SIDE_MARGIN);
};

const onClone = (documentClone: Document) => {
  const cloneDisplayAreaElement = documentClone.querySelector(
    `#${DISPLAY_AREA_ELEMENT_ID}`
  ) as HTMLElement;

  cloneDisplayAreaElement.style.transform = 'scale(1.0)';
};

export const downloadPngFile = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('main')!.scrollTo(0, 0);

  const downloadTargetElement = document.querySelector(
    `#${DOWNLOAD_TARGET_ELEMENT_ID}`
  ) as HTMLElement;

  const displayAreaElement = document.querySelector(
    `#${DISPLAY_AREA_ELEMENT_ID}`
  ) as HTMLElement;

  calculateSizeAndPositionOfTree(downloadTargetElement, displayAreaElement);

  import(/* webpackChunkName: 'html2canvas' */ 'html2canvas').then((res) => {
    const html2canvas = res.default;
    html2canvas(downloadTargetElement, {
      onclone: onClone,
      height,
      width,
      x: canvasXOffset,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const elem = document.createElement('a');
        elem.href = url;
        elem.download = `${new Date().toISOString()}.png`;
        elem.click();
        URL.revokeObjectURL(url);
      });
    });
  });
};
