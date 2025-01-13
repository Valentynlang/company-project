<template>
  <section class="bg-beige grid grid-cols-1 md:max-h-screen md:h-270 md:grid-cols-2">
    <div ref="travelTimesLeft" class="relative pt-8 md:pb-16 pb-24 md:pt-32 max-md:px-5">
      <div class="md:absolute md:top-16 md:left-1/2 md:-translate-x-1/2 flex  gap-3 md:gap-14 max-md:mb-16 justify-center">
        <button class="LocationTravelTimes__button" :class="{ 'LocationTravelTimes__button--active': isActive === 1 }" @click="selectType(1, 'SYON PARK')"><WalkIcon /></button>
        <button class="LocationTravelTimes__button" :class="{ 'LocationTravelTimes__button--active': isActive === 2 }" @click="selectType(2, 'HEATHROW AIRPORT')"><CarIcon /></button>
        <button class="LocationTravelTimes__button" :class="{ 'LocationTravelTimes__button--active': isActive === 3 }" @click="selectType(3, 'WEST END')"><SubwayIcon /></button>
        <button class="LocationTravelTimes__button" :class="{ 'LocationTravelTimes__button--active': isActive === 4 }" @click="selectType(4, 'THE CITY')"><TrainIcon /></button>
        <button class="LocationTravelTimes__button" :class="{ 'LocationTravelTimes__button--active': isActive === 5 }" @click="selectType(5, 'CHISWICK HIGH ROAD')"><CycleIcon /></button>
        <button class="LocationTravelTimes__button purple" :class="{ 'LocationTravelTimes__button--active purple': isActive === 6 }" @click="selectType(6, 'CANARY WHARF')"><SubwayIcon class="text-purple" /></button>
        <button class="LocationTravelTimes__button" :class="{ 'LocationTravelTimes__button--active': isActive === 7 }" @click="selectType(7, 'CHISWICK BUSINESS PARK')"><BusIcon /></button>
      </div>

      <div class="w-full md:h-full flex items-center justify-center">
        <div
          v-for="travel in travelTimes"
          :key="travel.id"
          v-show="isActive === travel.id"
          class="flex flex-col items-center"
        >
          <span class="font-meduim uppercase text-3 mb-5">Travel times</span>
          <h3 class="text-10 md:text-18 font-secondary mb-14 text-center">{{ travel.type }}</h3>

          <div
            v-for="(option, id) in travel.options"
            :key="id"
            class="flex flex-col items-center"
          >
            <h6 class="text-4.5 font-medium uppercase mb-1 tracking-tight text-center">{{ option.name }}</h6>
            <span class="opacity-50 font-medium uppercase underline tracking-tight">{{ option.time }}</span>
            <div v-if="id + 1 < travel.options.length" class="border-dashed border-l h-6 opacity-25 my-5 w-fit"></div>
          </div>
        </div>
      </div>
    </div>
    <div ref="travelTimesImage" class="hidden md:block overflow-hidden h-full relative">
      <NuxtImg v-show="isActive === 1" src="/img/WALK-Syon-Park.webp" class="w-full h-full object-cover" loading="lazy" alt="Syon Park" />
      <NuxtImg v-show="isActive === 2" src="/img/CAR-Heathrow-Airport.webp" class="w-full h-full object-cover" loading="lazy" alt="Heathrow Airport" />
      <NuxtImg v-show="isActive === 3" src="/img/UNDERGROUND-West-End-London.webp" class="w-full h-full object-cover" loading="lazy" alt="West End London" />
      <NuxtImg v-show="isActive === 4" src="/img/RAIL-The-City-of-London.webp" class="w-full h-full object-cover" loading="lazy" alt="The City of London" />
      <NuxtImg v-show="isActive === 5" src="/img/CYCLE-Chiswick-High-Road.webp" class="w-full h-full object-cover" loading="lazy" alt="Chiswick High Road" />
      <NuxtImg v-show="isActive === 6" src="/img/ELIZABETH-Canary-Wharf-London.webp" class="w-full h-full object-cover" loading="lazy" alt="Canary Wharf London" />
      <NuxtImg v-show="isActive === 7" src="/img/BUS-Chiswick-Business-Park.webp" class="w-full h-full object-cover" loading="lazy" alt="Chiswick Business Park" />
      <span class="absolute bottom-8 left-1/2 text-4.5 text-white font-medium text-uppercase -translate-x-1/2">{{ activeTitle }}</span>
    </div>
  </section>
</template>

<script setup>
  import WalkIcon from '@/public/svg/walk.svg'
  import CycleIcon from '@/public/svg/cycle.svg'
  import BusIcon from '@/public/svg/bus.svg'
  import CarIcon from '@/public/svg/car.svg'
  import TrainIcon from '@/public/svg/train.svg'
  import SubwayIcon from '@/public/svg/subway.svg'

  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'

  import { ref, onMounted, nextTick } from 'vue'

  const isActive = ref(1)
  const activeTitle = ref('SYON PARK')
  const travelTimes = ref([
    {
      id: 1,
      type: 'WALK',
      options: [
        {
          name: 'JOHNSON\'S ISLAND',
          time: '1 MINUTE',
        },
        {
          name: 'SYON PARK',
          time: '5 MINUTES',
        },
        {
          name: 'BRENTFORD STATION',
          time: '8 MINUTES',
        },
        {
          name: 'UNIVERSITY OF WEST LONDON',
          time: '10 MINUTES',
        },
        {
          name: 'SKY',
          time: '15 MINUTES',
        },
      ],
    },
    {
      id: 2,
      type: 'DRIVE',
      options: [
        {
          name: 'BOSTON MANOR (PICCADILLY LINE)',
          time: '5 MINUTES',
        },
        {
          name: 'M4 ENTRANCE',
          time: '7 MINUTES',
        },
        {
          name: 'HEATHROW AIRPORT',
          time: '15 MINUTES',
        },
        {
          name: 'ROYAL MID-SURREY GOLF COURSE',
          time: '15 MINUTES',
        },
        {
          name: 'IMPERIAL COLLEGE',
          time: '20 MINUTES',
        },
      ],
    },
    {
      id: 3,
      type: 'UNDERGROUND',
      options: [
        {
          name: 'SOUTH KENSINGTON',
          time: '23 MINUTES',
        },
        {
          name: 'HYDE PARK',
          time: '27 MINUTES',
        },
        {
          name: 'PICCADILLY CIRCUS',
          time: '31 MINUTES',
        },
        {
          name: 'LEICESTER SQUARE',
          time: '33 MINUTES',
        },
        {
          name: 'BANK',
          time: '50 MINUTES',
        },
      ],
    },
    {
      id: 4,
      type: 'TRAIN',
      options: [
        {
          name: 'CHISWICK STATION',
          time: '5 MINUTES',
        },
        {
          name: 'CLAPHAM JUNCTION',
          time: '19 MINUTES',
        },
        {
          name: 'VAUXHALL STATION',
          time: '24 MINUTES',
        },
        {
          name: 'WATERLOO STATION',
          time: '32 MINUTES',
        },
        {
          name: 'BANK STATION',
          time: '38 MINUTES',
        },
      ],
    },
    {
      id: 5,
      type: 'CYCLE',
      options: [
        {
          name: 'KEW PIER',
          time: '9 MINUTES',
        },
        {
          name: 'ROYAL BOTANIC GARDENS, KEW',
          time: '10 MINUTES',
        },
        {
          name: 'CHISWICK HIGH ROAD',
          time: '11 MINUTES',
        },
        {
          name: 'EALING BROADWAY',
          time: '15 MINUTES',
        },
        {
          name: 'RICHMOND PARK',
          time: '22 MINUTES',
        },
      ],
    },
    {
      id: 6,
      type: 'ELIZABETH LINE',
      options: [
        {
          name: 'BOND STREET',
          time: '12 MINUTES',
        },
        {
          name: 'TOTTENHAM COURT ROAD',
          time: '14 MINUTES',
        },
        {
          name: 'HEATHROW AIRPORT',
          time: '15 MINUTES',
        },
        {
          name: 'LIVERPOOL STREET',
          time: '19 MINUTES',
        },
        {
          name: 'CANARY WHARF',
          time: '26 MINUTES',
        },
      ],
    },
    {
      id: 7,
      type: 'BUS',
      options: [
        {
          name: 'EALING BROADWAY',
          time: '17 MINUTES',
        },
        {
          name: 'WEST MIDDLESEX UNIVERSITY HOSPITAL',
          time: '17 MINUTES',
        },
        {
          name: 'CHISWICK BUSINESS PARK',
          time: '20 MINUTES',
        },
        {
          name: 'UNIVERSITY OF WEST LONDON',
          time: '23 MINUTES',
        },
        {
          name: 'TWICKENHAM STADIUM',
          time: '24 MINUTES',
        },
      ],
    },
  ])

  const selectType = (index, title) => {
    isActive.value = index
    activeTitle.value = title
  }

  const travelTimesLeft = ref(null)
  const travelTimesImage = ref(null)

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    gsap.fromTo(
      travelTimesImage.value,
      {
        y: 0,
        opacity: 0
      },
      {
        delay: 0.3,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: travelTimesImage.value,
          start: 'top bottom'
        }
      }  
    );
    gsap.fromTo(
      travelTimesLeft.value,
      {
        y: 50,
        opacity: 0
      },
      {
        delay: 0.3,
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: travelTimesLeft.value,
          start: 'top bottom'
        }
      }  
    );
  });
</script>

<style lang="scss" scoped>
  .LocationTravelTimes {
    &__button {
      position: relative;
      transition: all .3s ease;

      &:not(.purple)::before {
        content: '';
        position: absolute;
        width: 0;
        height: 3px;
        background: var(--black);
        left: 50%;
        transform: translateX(-50%);
        bottom: -8px;
        transition: width .3s ease;
      }

      &.purple::before {
        content: '';
        position: absolute;
        width: 0;
        height: 3px;
        background: var(--purple);
        left: 50%;
        transform: translateX(-50%);
        bottom: -8px;
        transition: width .3s ease;
      }

      &:not(.purple) {
        &:hover {
          &::before {
            content: '';
            position: absolute;
            width: 2rem;
            height: 3px;
            background: var(--black);
            left: 50%;
            transform: translateX(-50%);
            bottom: -8px;
          }
        }
      }

      &.purple {
        &:hover {
          &::before {
            content: '';
            position: absolute;
            width: 2rem;
            height: 3px;
            background: var(--purple);
            left: 50%;
            transform: translateX(-50%);
            bottom: -8px;
          }
        }
      }

      &--active {
        svg {
          opacity: 1 !important;
        }

        &:not(.purple) {
          &::before {
            content: '';
            position: absolute;
            width: 2rem;
            height: 3px;
            background: var(--black);
            left: 50%;
            transform: translateX(-50%);
            bottom: -8px;
          }
        }

        &.purple {
          &::before {
            content: '';
            position: absolute;
            width: 2rem;
            height: 3px;
            background: var(--purple);
            left: 50%;
            transform: translateX(-50%);
            bottom: -8px;
          }
        }
      }
      
      svg {
        height: 3rem;
        width: 3rem;
        opacity: .25;
        transition: opacity .3s ease;

        @media (max-width: $phone) {
          width: 2.25rem;
          height: 2.25rem;
        }
      }
    }
  }
</style>