export {}

declare global {
  interface WPImage {
    link: string;
    sizes: ImageSizes;
  }

  interface ImageSizes {
    medium: string;
    medium_large: string;
    large: string;
  }
  interface WPHeaders {
    total: string;
    totalpages: number;
  }

  interface Category {
    id: number;
    name: string;
    slug: string;
    count: number;
  }

  interface Article {
    id: string;
    title: {
      rendered: string;
    };
    slug: string;
    journal_category: number[];
    acf: {
      date: string;
      promotitle: string;
      rmlinklabel: string;
      promo_image: {
        image: {
          link: string;
        }
      }
    }
  }
}