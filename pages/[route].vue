<script setup>
  const router = useRouter();
  const { path } = useRoute();

  const redirectIfPagePathIsInvalid = () => {
    const isPathValid = (path) => false;
    if (!isPathValid(path)) {
      router.push({ path: "/404" });
    }
  };
  redirectIfPagePathIsInvalid();
</script>