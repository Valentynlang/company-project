export function useResponsiveImage() {
  const { isDesktop } = useMediaQuery()

  const responsiveImage = (image: any, imageMob: any) => {
    return isDesktop ? image : imageMob ? imageMob : image
  };

  return {
    responsiveImage,
  }
}