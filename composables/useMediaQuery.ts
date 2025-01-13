export interface MediaQueryHelper {
    isDesktop: boolean;
    isMobile: boolean;
  }
  
  export default function useMediaQuery(): MediaQueryHelper {
    if (process.client) {
      const isDesktop = window.innerWidth >= 768
      const isMobile = !isDesktop;
  
      return {
        isDesktop,
        isMobile,
      };
    }
  
    return {
      isDesktop: true,
      isMobile: false,
    }
  };