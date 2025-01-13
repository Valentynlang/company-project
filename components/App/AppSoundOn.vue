<template>
  <svg
    v-if="animated"
    class="_animated"
    :class="`${on ? '_on' : '_off'} ${paused ? '_paused' : '_playing'}`"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="17.25" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="10.75" y1="9" x2="10.75" y2="27" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="14.75" y1="9" x2="14.75" y2="27" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="18.75" y1="9" x2="18.75" y2="27" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="22.75" y1="9" x2="22.75" y2="27" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="26.75" y1="9" x2="26.75" y2="27" stroke="#FAFAFA" stroke-width="1.5" />
  </svg>
  <svg
    v-else-if="on"
    class="_static _on"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="17.25" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="10.75" y1="13" x2="10.75" y2="22" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="14.75" y1="9" x2="14.75" y2="27" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="18.75" y1="14" x2="18.75" y2="22" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="22.75" y1="9" x2="22.75" y2="27" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="26.75" y1="14" x2="26.75" y2="22" stroke="#FAFAFA" stroke-width="1.5" />
  </svg>
  <svg
    v-else
    class="_static _off"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="17.25" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="10.75" y1="17" x2="10.75" y2="19" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="14.75" y1="17" x2="14.75" y2="19" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="18.75" y1="17" x2="18.75" y2="19" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="22.75" y1="17" x2="22.75" y2="19" stroke="#FAFAFA" stroke-width="1.5" />
    <line x1="26.75" y1="17" x2="26.75" y2="19" stroke="#FAFAFA" stroke-width="1.5" />
  </svg>
</template>

<script setup>
  defineProps({
    animated: {
      type: Boolean,
      default: false,
    },
    on: {
      type: Boolean,
      default: false,
    },
    paused: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style lang="scss" scoped>
  @keyframes line_rand {
    0% {
      transform: scaleY(0.24);
    }
    10% {
      transform: scaleY(0.18);
    }
    20% {
      transform: scaleY(0.65);
    }
    30% {
      transform: scaleY(0.1);
    }
    40% {
      transform: scaleY(0.8);
    }
    50% {
      transform: scaleY(0.1);
    }
    60% {
      transform: scaleY(0.33);
    }
    70% {
      transform: scaleY(0.52);
    }
    80% {
      transform: scaleY(0.1);
    }
    90% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0.24);
    }
  }

  @keyframes line_kanye {
    0% {
      transform: scaleY(0.1);
    }
    4% {
      transform: scaleY(0.2);
    }
    8% {
      transform: scaleY(0.2);
    }
    12% {
      transform: scaleY(0.8);
    }
    16% {
      transform: scaleY(0.3);
    }
    20% {
      transform: scaleY(0.9);
    }
    24% {
      transform: scaleY(0.6);
    }
    28% {
      transform: scaleY(0.9);
    }
    32% {
      transform: scaleY(0.2);
    }
    36% {
      transform: scaleY(0.9);
    }
    40% {
      transform: scaleY(0.5);
    }
    44% {
      transform: scaleY(0.9);
    }
    48% {
      transform: scaleY(0.9);
    }
    52% {
      transform: scaleY(0.6);
    }
    56% {
      transform: scaleY(0.7);
    }
    60% {
      transform: scaleY(0.9);
    }
    64% {
      transform: scaleY(0.5);
    }
    68% {
      transform: scaleY(0.9);
    }
    72% {
      transform: scaleY(0.5);
    }
    76% {
      transform: scaleY(0.6);
    }
    80% {
      transform: scaleY(0.2);
    }
    84% {
      transform: scaleY(0.6);
    }
    88% {
      transform: scaleY(0.5);
    }
    92% {
      transform: scaleY(0.2);
    }
    96% {
      transform: scaleY(0.1);
    }
    100% {
      transform: scaleY(0.1);
    }
  }

  svg {
    width: 100%;
    height: 100%;
  }

  ._animated line {
    transform: scaleY(0.1);
    transform-origin: center;
    animation-iteration-count: infinite;
    animation-name: line_kanye;
    animation-duration: 2.5s;

    &:nth-child(2) {
      animation-delay: 0.4s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.2s;
    }
    &:nth-child(5) {
      animation-delay: 0.1s;
    }
    &:nth-child(6) {
      animation-delay: 0s;
    }
  }
  ._animated._off line {
    animation: unset;
  }
  ._animated._on._paused line {
    animation-play-state: paused;
  }
</style>
