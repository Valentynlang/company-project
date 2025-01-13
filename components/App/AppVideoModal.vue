<template>
  <aside class="video-modal fixed top-0 left-0 w-screen h-screen bg-black flex items-center z-50">
    <button class="rounded-full bg-white absolute top-10 right-10 w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center z-50" @click="closeModal()">
      <!-- <CloseIcon class="text-black" /> -->
      <NuxtImg src="/svg/close.svg" class="w-3 sm:w-5" loading="lazy" alt="Close icon" />
    </button>

    <!-- <video ref="video" autoplay="autoplay" playsinline="" class="sm:h-full w-full object-cover" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata">
        <source :src="`https://player.vimeo.com/video/${appStore.videoId}?dnt=1&quality=1080p`" type="video/mp4" />
    </video> -->
    <vimeo-player class="vimeo-video w-full h-full pointer-events-none" ref="video" :video-id="`${appStore.videoId}`" :player-height="1080" :player-width="1920" :autoplay="true" :controls="false" @timeupdate="onTimeUpdate" @durationchange="onLoadedMetadata" />


    <div class="hidden sm:!flex absolute bottom-14 w-full h-14 gap-1">
      <button class="w-36 uppercase text-white font-medium" @click="togglePlayPause">{{ playing ? 'Pause' : 'Play' }}</button>
      <div class="relative flex flex-1 items-center justify-center cursor-pointer">
        <div class="h-1 w-full bg-white"></div>
        <div
          class="absolute top-1/3 transition duration-100	ease-linear"
          :style="{ left: `${status.percent * 100 }%` }"
        >
          <div class="circle"></div>
          <div class="pointer-events-none	absolute left-1/2 top-6 -translate-y-1/2 -translate-x-1/2 text-white text-sm">{{ secondsToReadable(status.time) }}</div>
        </div>
      </div>
      <div class="w-52 flex justify-center items-center cursor-pointer gap-4">
        <button class="uppercase text-white font-medium" @click="toggleMute">{{ muted ? 'Sound Off' : 'Sound On' }}</button>
        <div class="w-9 h-9">
          <AppSoundOn :animated="true" :on="!muted" :paused="!playing" />
        </div>
      </div>
    </div>

    <div class="sm:!hidden play-mobile" :class="playing ? '' : 'bg'" @click="togglePlayPause()">
      <div class="h-20 w-20 text-black flex items-center justify-center rounded-full bg-white" :class="!playing ? '' : 'hidden'">PLAY</div>
    </div>
    <div class="flex sm:!hidden mute" @click="toggleMute()">
      <div class="uppercase text-white pr-4">{{ muted ? 'SOUND OFF' : 'SOUND ON' }}</div>
      <div class="w-9 h-9">
        <AppSoundOn :animated="true" :on="!muted" />
      </div>
    </div>
  </aside>
</template>

<script setup>
  import gsap from 'gsap'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

  import { onMounted, ref } from 'vue'

  gsap.registerPlugin(ScrollToPlugin)

  const appStore = useAppStore()

  const video = ref(null)
  const playing = ref(true)
  const muted = ref(false)
  const status = ref({
    time: 0,
    percent: 0,
    maxTime: 0,
  })

  const togglePlayPause = () => {
    if (!playing.value) {
      video.value.play()
      playing.value = true
    } else {
      video.value.pause()
      playing.value = false
    }
  }

  const toggleMute = () => {
    if (muted.value) {
      video.value.unmute()
      muted.value = false
    } else {
      video.value.mute()
      muted.value = true
    }
  }

  const onTimeUpdate = (event, data) => {
    if(video.value) {
      status.value.time = event.seconds
      status.value.percent = event.percent
    }
  }

  const onLoadedMetadata = (event, data) => {
    status.value.maxTime = event.duration
    status.value.time = 0
  }

  const secondsToReadable = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const closeModal = () => {
    gsap.fromTo(
      ".video-modal",
      { yPercent: 0 },
      { yPercent: -100, duration: 1, ease: "expo.out", onComplete: () => {
        appStore.closeVideoModal()
      }}
    )
  }

  onMounted(() => {
    gsap.fromTo(
      ".video-modal",
      { yPercent: -100 },
      { yPercent: 0, duration: 1, ease: "expo.out" }
    )
  })
</script>

<style lang="scss">
  .video-modal {
    .vimeo-video iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: max(101vw, 178vh);
      height: max(101vh, 57vw);
  
      @media (max-width: $phone) {
        width: 100%;
        height: 100%;
      }
    }
  
    .circle {
      width: .675rem;
      height: .675rem;
      background: var(--white);
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, 40%);
      transition: width .15s, height .15s;
    }
  
    .play-mobile {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  
    .bg {
      background: rgba(0, 0, 0, .5333333333333333);
    }
  
    .mute {
      position: fixed;
      bottom: .75rem;
      right: .75rem;
      padding: .75rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
