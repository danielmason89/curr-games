// Media Resize
export const smallImage = (imagePath: string, size: number) => {
  if (!imagePath) return undefined;
  const image = imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        /media\/screenshots/,
        `media/resize/${size}/-/screenshots`
      )
    : imagePath.replace(/\/media\/games\//, `/media/resize/${size}/-/games/`);
  return image;
};
