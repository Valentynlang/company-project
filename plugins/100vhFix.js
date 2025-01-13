export default defineNuxtPlugin((nuxtApp) => {
    // This will run on the client-side only, after the app has mounted
    if (process.client) {
      const setStyleVariable = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
  
      // Call it once initially
      setStyleVariable();
  
      // Add the event listener for window resize
      window.addEventListener('resize', setStyleVariable);
  
      // Clean up the event listener when the app is destroyed
      nuxtApp.hook('app:unmounted', () => {
        window.removeEventListener('resize', setStyleVariable);
      });
    }
  });