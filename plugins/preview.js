export default defineNuxtPlugin(() => {
  const preview = ref(false);

  const previewMiddleware = async (to) => {
    const isPreview = to.query.preview && to.query.preview === 'true';

    if (isPreview) {
      preview.value = true
      return;
    }

    if (preview.value) {
      return navigateTo({
        ...to,
        query: {
          ...to.query,
          preview: 'true'
        }
      });
    }
  };

  addRouteMiddleware('preview', previewMiddleware, { global: true });

  return { provide: { preview } };
});