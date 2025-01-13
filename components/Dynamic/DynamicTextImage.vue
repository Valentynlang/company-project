<template>
  <section
    ref="animatedSection"
    class="flex flex-col gap-16 px-5 md:px-10 md:grid md:grid-cols-12 md:gap-10"
    :class="[
      paddings ? `pt-mob-${paddings.padding_top_mob} pt-dsk-${paddings.padding_top_dsk} pb-mob-${paddings.padding_bottom_mob} pb-dsk-${paddings.padding_bottom_dsk}`: '',
      { 'bg-dark_green text-gold': type === 'txt_img_dbl_dark_bg_res' },
      { 'bg-beige ': type === 'txt_img_triple_col_bg_apart' || type === 'txt_img_triple_col_bg_apart_2' },
    ]"
  >
    <template v-if="isDesktop">
      <div
        v-if="type === 'txt_img_triple_col_bg_apart'"
        :class="[
          {'col-start-1 col-end-13 order-1 flex justify-between grid grid-cols-12 gap-5 md:gap-10 mb-18' : type === 'txt_img_triple_col_bg_apart'},
        ]"
      >
        <div
          v-if="type === 'txt_img_triple_col_bg_apart'"
          class="col-start-1 col-end-7"
        >
          <span
            v-if="data.subtitle"
            class="animated-text block mb-2 text-3 uppercase font-medium"
          >
            {{ data.subtitle }}
          </span>
          <h3
            v-if="data.main_title"
            class="animated-text text-16 font-secondary"
          >
            {{ data.main_title }}
          </h3>
        </div>
        <p
          v-html="data?.description"
          class="animated-text col-start-10 col-end-13 text-4.5"
        />
      </div>

      <div
        class="gap-16 md:gap-10 justify-between"
        :class="[
          { 'order-1 col-span-3 flex flex-col': type === 'txt_img_dbl_building_1' },
          { 'order-1 col-span-4 flex flex-col': type === 'txt_img_sngl_building_sq' },
          { 'order-1 col-span-2 flex flex-col': type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_sngl_withpromo_location' || type === 'txt_img_dbl_promo_apart' || type === 'txt_img_dbl_apart' || type === 'txt_img_triple_no_text' },
          { 'order-1 col-span-3 flex flex-col': type === 'txt_img_dbl_neighb_2' },
          { 'order-1 col-span-5 flex flex-col flex-col-reverse': type === 'txt_img_triple_col_bg_apart_2' },
          { 'order-1 col-span-4 grid grid-cols-4': type === 'txt_img_triple_col_bg_apart' },
          { 'order-3 col-span-4 grid grid-cols-4': type === 'txt_img_dbl_building_2'},
          { 'order-3 col-span-2 flex items-center': type === 'txt_img_dbl_promo_neighb' },
          { 'order-3 col-span-3 grid grid-cols-3': type === 'txt_img_dbl_neighb' || type === 'txt_img_dbl_neighb_3' },
          { 'order-3 col-span-5 grid grid-cols-5': type === 'txt_img_dbl_res_club' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location' },
          { 'order-3 col-span-2 grid grid-cols-2': type === 'txt_img_sngl_withpromo_apart' },
          { 'order-2 col-span-3': type === 'txt_img_dbl_kitchens_apart' },
        ]"
      >
        <div
          v-if="(data?.small_image?.image?.link || data?.image_2?.image?.link) && type !== 'txt_img_dbl_promo_apart'"
          :class="[
            { 'col-start-2 col-end-5 order-2 flex' : type === 'txt_img_dbl_building_2' },
            { 'col-start-1 col-end-4 order-2 flex' : type === 'txt_img_dbl_neighb' },
            { 'col-start-2 col-end-4 order-1 flex' : type === 'txt_img_dbl_neighb_3' },
            { 'col-start-3 col-end-6 order-1' : type === 'txt_img_dbl_res_club' },
            { 'col-start-3 col-end-6 order-2 flex' : type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location' },
            { 'col-start-1 col-end-3 order-1 flex' : type === 'txt_img_triple_col_bg_apart' },
            { 'col-start-1 col-end-3 order-1 flex' : type === 'txt_img_triple_col_bg_apart' },
            { 'flex justify-center' : type === 'txt_img_triple_col_bg_apart_2' },
            { 'w-full' : type === 'txt_img_dbl_promo_neighb' },
          ]"
        >
          <AppImage
            is-lazy-loading="true"
            :image="data?.small_image?.image || data?.image_2?.image"
            :imageType="WPImageType.oneFourthScreen"
            class="w-full inline-flex"
            :class="[
              { 'self-end' : type !== 'txt_img_dbl_neighb_3' && type !== 'txt_img_triple_col_bg_apart' && type !== 'txt_img_triple_col_bg_apart_2' },
              { 'self-start' : type === 'txt_img_dbl_neighb_3' || type === 'txt_img_triple_col_bg_apart' },
              { 'aspect-[1/1] object-cover w-2/5 max-w-72' : type === 'txt_img_triple_col_bg_apart_2' },
            ]"
          />
        </div>

        <div
          v-if="type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_sngl_withpromo_location'"
        >
          <div class="DynamicTextImage__video relative mb-3" @click="openSingleModal(type === 'txt_img_sngl_withpromo_neighb' && data.video_id ? data.video_id : data.promo_popup_image.image ? data.promo_popup_image.image : data.promo_image.image)">
            <AppImage
              is-lazy-loading="true"
              :image="data.promo_image.image"
              :imageType="WPImageType.oneFourthScreen"
              class="w-full inline-flex self-end aspect-[1/1] object-cover"
            />
            <NuxtImg v-if="data.video_id" src="/svg/play.svg" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-15" loading="lazy" alt="Play icon" />
          </div>
          <h6 v-if="data.promo_title" class="animated-text uppercase text-4.5 font-medium tracking-tigh mb-1">{{ data.promo_title }}</h6>
          <span v-if="data.promo_link_text" class="animated-text text-3.5">{{ data.promo_link_text }}</span>
          <button v-if="type === 'txt_img_sngl_withpromo_location'" class="animated-text mt-3 py-2 px-5.5 rounded-full border border-black bg-white hover:bg-black hover:[&>svg]:text-white transition-all" @click="openSingleModal(data.promo_popup_image.image ? data.promo_popup_image.image : data.promo_image.image)">
            <ArrowIcon class="w-2.5 -rotate-90 text-black" />  
          </button>
        </div>

        <div
          v-if="type === 'txt_img_sngl_withpromo_apart' || type === 'txt_img_dbl_promo_apart'"
          :class="[
            { 'col-start-1 col-end-3 order-1' : type === 'txt_img_sngl_withpromo_apart' },
          ]"
        >
          <AppImage
            is-lazy-loading="true"
            :image="data.promo_image.image"
            :imageType="WPImageType.oneFourthScreen"
            class="w-full inline-flex self-end aspect-[1/1] object-cover"
          />
          <h6 v-if="data.promo_title" class="animated-text uppercase text-3.5 leading-tight font-medium mt-4 mb-5">{{ data.promo_title }}</h6>
          <span v-if="data.promo_link_text" class="animated-text text-3.5 mb-4">{{ data.promo_link_text }}</span>
          <!-- <AppLink :to="routeLink">
            <AppImage
              is-lazy-loading="true"
              :image="data.promo_image.image"
              :imageType="WPImageType.oneFourthScreen"
              class="w-full inline-flex self-end aspect-[1/1] object-cover"
            />
            <h6 v-if="data.promo_title" class="animated-text uppercase text-3.5 leading-tight font-medium mt-4 mb-5">{{ data.promo_title }}</h6>
            <span v-if="data.promo_link_text" class="animated-text text-3.5 mb-4">{{ data.promo_link_text }}</span>
            <button v-if="type === 'txt_img_sngl_withpromo_apart' || type === 'txt_img_dbl_promo_apart'" class="animated-text flex items-center justify-center gap-4 transition-all">
              <span class="py-1 px-2 rounded-full border border-black bg-white">
                <ArrowIcon class="w-2.5 -rotate-90 text-black" /> 
              </span>
              <span class="uppercase font-medium text-3.5">
                Read More
              </span>
            </button>
          </AppLink> -->
        </div>

        <div
          v-if="type === 'txt_img_sngl_building_sq' ||  type === 'txt_img_dbl_building_2' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location'"
          class="flex flex-col gap-3"
          :class="[
            {'col-start-1 col-end-4 order-1' :  type === 'txt_img_dbl_building_2'},
            {'col-start-1 col-end-5 order-1' :  type === 'txt_img_dbl_dark_bg_res'},
            {'col-start-1 col-end-5 order-1 text-center mt-30' :  type === 'txt_img_dbl_location'},
          ]"
        >
          <span v-if="data.subtitle" class="animated-text text-3 uppercase mb-1 block font-medium">{{ data.subtitle }}</span>
          <h3 v-if="data.main_title" class="animated-text font-secondary text-8 md:text-16">{{ data?.main_title }}</h3>
          <p v-if="(type === 'txt_img_dbl_building_2' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location') && data.description" v-html="data.description" class="animated-text text-4.5 mt-3" />
        </div>

        <div
          v-if="(type !== 'txt_img_dbl_building_2' && type !== 'txt_img_dbl_promo_neighb' && type !== 'txt_img_dbl_location' && type !== 'txt_img_dbl_kitchens_apart' && type !== 'txt_img_triple_col_bg_apart') && data?.description"
          :class="[
            {'col-start-1 col-end-3 order-1' : type === 'txt_img_dbl_neighb'},
            {'col-start-1 col-end-4 order-2 inline-flex self-end' : type === 'txt_img_dbl_neighb_3'},
            {'col-start-1 col-end-3 order-2 inline-flex self-end' : type === 'txt_img_dbl_res_club' || type === 'txt_img_sngl_withpromo_apart' },
            {'text-center': type === 'txt_img_triple_col_bg_apart_2'}
          ]"
        >
          <div
            v-if="type === 'txt_img_triple_col_bg_apart_2'"
            :class="[
              { 'text-center mb-7 w-4/5 mx-auto': type === 'txt_img_triple_col_bg_apart_2' }
            ]"
          >
            <span
              v-if="data.subtitle"
              class="animated-text block mb-2 text-3 uppercase font-medium"
            >
              {{ data.subtitle }}
            </span>
            <h3
              v-if="data.main_title"
              class="animated-text text-16 font-secondary"
            >
              {{ data.main_title }}
            </h3>
          </div>
          <p
            class="animated-text text-4.5"
            v-html="data?.description"
            :class="[
              {'w-2/5 mx-auto': type === 'txt_img_triple_col_bg_apart_2'}
            ]"
          />
        </div>
      </div>

      <div
        v-if="type === 'txt_img_dbl_promo_neighb'"
        class="order-4 col-span-3 grid grid-cols-3"
      >
        <p v-if="data.description" v-html="data.description" class="animated-text col-start-2 col-end-4 text-4.5" />

        <div class="col-start-2 col-end-4 inline-flex self-end flex-col">
          <div class="DynamicTextImage__video relative mb-3" @click="openSingleModal(data.video_id ? data.video_id : data.promo_popup_image.image ? data.promo_popup_image.image : data.promo_image.image)">
            <AppImage
              is-lazy-loading="true"
              :image="data.promo_image.image"
              :imageType="WPImageType.oneFourthScreen"
              class="w-full"
            />
            <NuxtImg v-if="data.video_id" src="/svg/play.svg" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-15" loading="lazy" alt="Play icon" />
          </div>
          <h6 v-if="data.promo_title" class="animated-text uppercase text-4.5 font-medium tracking-tigh mb-1">{{ data.promo_title }}</h6>
          <span v-if="data.promo_link_text" class="animated-text text-3.5">{{ data.promo_link_text }}</span>
        </div>
      </div>

      <div
        v-if="type === 'txt_img_triple_col_bg_apart'"
        :class="[
          { 'order-4 col-span-3 flex': type === 'txt_img_triple_col_bg_apart' }
        ]"
      >
        <AppImage
          is-lazy-loading="true"
          :image="data?.image_3?.image"
          :imageType="WPImageType.oneFourthScreen"
          class="w-full inline-flex"
          :class="[
            { 'self-end aspect-[1/1]' : type === 'txt_img_triple_col_bg_apart' },
          ]"
        />
      </div>

      <div
        v-if="type !== 'txt_img_triple_no_text'"
        class="hidden md:block order-2"
        :class="[
          { 'col-span-2': type === 'txt_img_dbl_building_1' || type === 'txt_img_dbl_neighb' || type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_dbl_neighb_2' || type === 'txt_img_dbl_promo_neighb' || type === 'txt_img_dbl_neighb_3' || type === 'txt_img_sngl_withpromo_location' || type === 'txt_img_sngl_withpromo_apart' || type === 'txt_img_dbl_promo_apart' },
          { 'col-span-1': type === 'txt_img_dbl_building_2' || type === 'txt_img_dbl_res_club' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location' || type === 'txt_img_dbl_apart' || type === 'txt_img_sngl_building_sq' },
          { 'col-span-1 order-3': type === 'txt_img_triple_col_bg_apart' || type === 'txt_img_triple_col_bg_apart_2' },
        ]"
      />

      <div
        :class="[
          { 'order-3 col-span-7': type === 'txt_img_dbl_building_1' || type === 'txt_img_sngl_building_sq' || type === 'txt_img_dbl_neighb_2' },
          { 'order-3 col-span-8': type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_sngl_withpromo_location' },
          { 'order-1 col-span-5': type === 'txt_img_dbl_promo_neighb' },
          { 'order-1 col-span-7': type === 'txt_img_dbl_building_2' || type === 'txt_img_dbl_neighb' || type === 'txt_img_dbl_neighb_3' },
          { 'order-1 col-span-6': type === 'txt_img_dbl_res_club' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location' },
          { 'order-2 col-span-4': type === 'txt_img_triple_col_bg_apart' || type === 'txt_img_triple_col_bg_apart_2' },
          { 'order-1 col-span-8': type === 'txt_img_sngl_withpromo_apart' },
          { 'order-3 col-span-4': type === 'txt_img_dbl_promo_apart' },
          { 'order-1 col-span-9': type === 'txt_img_dbl_kitchens_apart' },
          { 'order-3 col-span-9': type === 'txt_img_dbl_apart' },
          { 'order-2 col-span-8': type === 'txt_img_triple_no_text' },
        ]"
      >
        <AppImage
          v-if="type === 'txt_img_dbl_building_1' || type === 'txt_img_dbl_building_2' || type === 'txt_img_dbl_promo_neighb' || type === 'txt_img_dbl_neighb_3' || type === 'txt_img_dbl_res_club' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location' ||  type === 'txt_img_triple_col_bg_apart' || type === 'txt_img_dbl_promo_apart' || type === 'txt_img_triple_col_bg_apart_2' || type === 'txt_img_dbl_neighb'"
          is-lazy-loading="true"
          :image="data?.large_image?.image"
          :imageType="WPImageType.halfScreen"
          class="w-full"
        />
        <AppImage
          v-if="type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_sngl_withpromo_location'"
          is-lazy-loading="true"
          :image="data?.image?.image"
          :imageType="WPImageType.halfScreen"
          class="w-full"
        />
        <AppImage
          v-if="type === 'txt_img_sngl_building_sq'"
          is-lazy-loading="true"
          :image="data?.image?.image"
          :imageType="WPImageType.halfScreen"
          class="w-full aspect-[1/1]"
        />
        <AppImage
          v-if="type === 'txt_img_dbl_neighb_2' || type === 'txt_img_sngl_withpromo_apart'"
          is-lazy-loading="true"
          :image="data?.large_image?.image || data?.image?.image"
          :imageType="WPImageType.halfScreen"
          class="w-full aspect-[1/1]"
        />
        <AppImage
          v-if="type === 'txt_img_dbl_kitchens_apart' || type === 'txt_img_dbl_apart' || type === 'txt_img_triple_no_text'"
          is-lazy-loading="true"
          :image="data?.large_image?.image || data?.image?.image"
          :imageType="WPImageType.halfScreen"
          class="w-full aspect-[3/2]"
        />
      </div>

      <div
        v-if="type === 'txt_img_dbl_promo_apart' || type === 'txt_img_dbl_kitchens_apart' || type === 'txt_img_triple_col_bg_apart_2' || type === 'txt_img_triple_no_text'"
        :class="[ 
          { 'order-4 col-span-4': type === 'txt_img_dbl_promo_apart' },
          { 'order-4 col-span-2': type === 'txt_img_triple_col_bg_apart_2' },
          { 'order-3 col-start-8 col-end-10': type === 'txt_img_dbl_kitchens_apart' },
          { 'order-3 col-span-2 flex items-end': type === 'txt_img_triple_no_text' },
        ]"
      >
        <AppImage
          v-if="type === 'txt_img_dbl_promo_apart' || type === 'txt_img_triple_col_bg_apart_2' || type === 'txt_img_triple_no_text'"
          is-lazy-loading="true"
          :image="data?.small_image?.image || data?.image_3?.image"
          :imageType="WPImageType.oneFourthScreen"
          class="w-full"
          :class="[
            { 'aspect-[4/5]' : type === 'txt_img_triple_col_bg_apart_2' }
          ]"
        />
        <p class="animated-text text-4.5" v-if="type === 'txt_img_dbl_kitchens_apart'" v-html="data?.description" />
      </div>
    </template>

    <template v-else>
      <div v-if="type === 'txt_img_triple_col_bg_apart'">
        <span
          v-if="data.subtitle"
          class="animated-text block mb-2 text-3 uppercase font-medium"
        >
          {{ data.subtitle }}
        </span>
        <h3
          v-if="data.main_title"
          class="animated-text text-8 font-secondary"
        >
          {{ data.main_title }}
        </h3>
      </div>
      <div class="txt_img_sngl_withpromo_neighb" v-if="type === 'txt_img_sngl_withpromo_neighb'">
        <div class="DynamicTextImage__video relative mb-3" @click="openSingleModal(type === 'txt_img_sngl_withpromo_neighb' && data.video_id ? data.video_id : data.promo_popup_image.image ? data.promo_popup_image.image : data.promo_image.image)">
          <AppImage
            is-lazy-loading="true"
            :image="data.promo_image.image"
            :imageType="WPImageType.oneFourthScreen"
            class="aspect-[1/1] w-full inline-flex self-end object-cover"
          />
          <NuxtImg v-if="data.video_id" src="/svg/play.svg" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-15" loading="lazy" alt="Play icon" />
        </div>
        <h6 v-if="data.promo_title" class="animated-text uppercase text-4.5 font-medium tracking-tigh mb-1">{{ data.promo_title }}</h6>
        <span v-if="data.promo_link_text" class="animated-text text-3.5">{{ data.promo_link_text }}</span>
      </div>
      <div v-if="data?.description && (type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_dbl_promo_apart' || type === 'txt_img_dbl_apart')">
        <p
          class="animated-text text-4.5"
          :class="[
            { 'text-center': type === 'txt_img_dbl_apart' }
          ]"
          v-html="data.description"
        />
      </div>
      <div v-if="type === 'txt_img_dbl_neighb' || type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_sngl_withpromo_location' || type === 'txt_img_dbl_neighb_2' || type === 'txt_img_dbl_promo_neighb' || type === 'txt_img_dbl_neighb_3' || type === 'txt_img_dbl_res_club' || type === 'txt_img_triple_col_bg_apart' || type === 'txt_img_sngl_withpromo_apart' || type === 'txt_img_dbl_promo_apart' || type === 'txt_img_dbl_kitchens_apart' || type === 'txt_img_dbl_apart' || type === 'txt_img_triple_no_text'" class="relative">
        <AppImage
          is-lazy-loading="true"
          :image="data?.large_image?.image || data?.image?.image"
          :imageType="WPImageType.oneFourthScreen"
          class="w-full"
          :class="[
            { 'aspect-[4/5] object-cover': type === 'txt_img_dbl_neighb' || type === 'txt_img_dbl_promo_neighb' || type === 'txt_img_dbl_res_club' || type === 'txt_img_triple_no_text' },
            { '!aspect-[1/1] object-cover': type === 'txt_img_dbl_neighb_2' || type === 'txt_img_sngl_withpromo_apart' },
            { 'aspect-[3/2] object-cover': type === 'txt_img_sngl_withpromo_neighb' || type === 'txt_img_sngl_withpromo_location' || type === 'txt_img_dbl_neighb_3' || type === 'txt_img_dbl_kitchens_apart' || type === 'txt_img_dbl_apart' },
          ]"
        />
      </div>

      <div
        v-if="(data?.subtitle || data?.main_title) && type !== 'txt_img_triple_col_bg_apart'"
        :class="[
          { 'text-center': type === 'txt_img_triple_col_bg_apart_2' }
        ]"
      >
        <span v-if="data?.subtitle" class="animated-text text-3 uppercase mb-1 block font-medium">{{ data.subtitle }}</span>
        <h3 v-if="data?.main_title" class="animated-text font-secondary text-11 md:text-16">{{ data?.main_title }}</h3>
        <p v-if="type === 'txt_img_triple_col_bg_apart_2'" class="animated-text text-4.5 mt-5" v-html="data.description" />
      </div>

      <div v-if="(data?.small_image?.image?.link || data?.image_2?.image?.link) && type === 'txt_img_triple_col_bg_apart_2'" >
        <AppImage
          is-lazy-loading="true"
          :image="data?.small_image?.image || data?.image_2?.image"
          :imageType="WPImageType.oneFourthScreen"
          :class="[
            { 'w-40 aspect-[1/1] mx-auto object-cover': type === 'txt_img_triple_col_bg_apart_2'},
          ]"
        />
      </div>

      <div v-if="type === 'txt_img_dbl_building_1' || type === 'txt_img_dbl_building_2' || type === 'txt_img_sngl_building_sq' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_location' || type === 'txt_img_triple_col_bg_apart_2'">
        <AppImage
          is-lazy-loading="true"
          :image="data?.large_image?.image || data?.image?.image"
          :imageType="WPImageType.oneFourthScreen"
          class="w-full"
          :class="[
            { 'aspect-[1/1] object-cover': type === 'txt_img_dbl_building_1' || type === 'txt_img_dbl_building_2' || type === 'txt_img_sngl_building_sq' },
            { 'aspect-[4/5] object-cover': type === 'txt_img_dbl_location' },
            { 'aspect-[2/3] object-cover': type === 'txt_img_dbl_dark_bg_res' },
          ]"
        />
      </div>
      <div v-if="data?.description && type !== 'txt_img_dbl_neighb_3' && type !== 'txt_img_sngl_withpromo_neighb' && type !== 'txt_img_dbl_promo_apart' && type !== 'txt_img_triple_col_bg_apart_2' && type !== 'txt_img_dbl_apart'">
        <p class="animated-text text-4.5" v-html="data.description" />
      </div>
      <div
        v-if="(data?.small_image?.image?.link || data?.image_2?.image?.link) && type !== 'txt_img_triple_col_bg_apart_2' && type !== 'txt_img_triple_no_text'"
        :class="[
          { 'flex justify-end': type === 'txt_img_dbl_neighb' || type === 'txt_img_dbl_dark_bg_res' },
          { 'flex justify-center': type === 'txt_img_dbl_neighb_3' },
        ]"
      >
        <AppImage
          is-lazy-loading="true"
          :image="data?.small_image?.image || data?.image_2?.image"
          :imageType="WPImageType.oneFourthScreen"
          :class="[
            { 'w-40 aspect-[1/1] object-cover': type === 'txt_img_dbl_neighb' || type === 'txt_img_dbl_neighb_3' || type === 'txt_img_triple_col_bg_apart' || type === 'txt_img_dbl_kitchens_apart'},
            { 'w-60 aspect-[1/1] object-cover': type !== 'txt_img_dbl_neighb' && type !== 'txt_img_triple_col_bg_apart' && type !== 'txt_img_dbl_promo_apart' && type !== 'txt_img_dbl_kitchens_apart' },
            { 'w-full aspect-[1/1] object-cover': type === 'txt_img_dbl_promo_apart'},
            { 'aspect-[4/5] object-cover': type === 'txt_img_dbl_res_club' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_dbl_apart' },
            { 'mx-auto': type === 'txt_img_dbl_apart' },
            { 'aspect-[3/2] object-cover w-full': type === 'txt_img_dbl_location' },
          ]"
        />
      </div>
      <div
        v-if="data?.image_3?.image?.link && type !== 'txt_img_triple_no_text'"
        :class="[
          { 'flex justify-end': type === 'txt_img_dbl_neighb' || type === 'txt_img_dbl_dark_bg_res' || type === 'txt_img_triple_col_bg_apart_2' },
          { 'flex justify-center': type === 'txt_img_dbl_neighb_3' },
        ]"
      >
        <AppImage
          is-lazy-loading="true"
          :image="data?.image_3?.image"
          :imageType="WPImageType.oneFourthScreen"
          :class="[
            { 'w-full aspect-[1/1] object-cover': type === 'txt_img_triple_col_bg_apart'},
          ]"
        />
      </div>
      <div v-if="data?.description && type === 'txt_img_dbl_neighb_3'">
        <p class="animated-text text-4.5" v-html="data.description" />
      </div>

      <div
        v-if="type === 'txt_img_triple_no_text'"
        class="grid grid-cols-2 gap-5"
      >
        <AppImage
          v-if="data?.image_2?.image"
          is-lazy-loading="true"
          :image="data?.image_2?.image"
          :imageType="WPImageType.oneFourthScreen"
          :class="[
            { 'h-auto': type === 'txt_img_triple_col_bg_apart'},
          ]"
        />

        <AppImage
          v-if="data?.image_3?.image?.link"
          is-lazy-loading="true"
          :image="data?.image_3?.image"
          :imageType="WPImageType.oneFourthScreen"
          :class="[
            { 'h-auto': type === 'txt_img_triple_col_bg_apart'},
          ]"
        />
      </div>

      <div v-if="type === 'txt_img_sngl_withpromo_apart' || type === 'txt_img_dbl_promo_apart'">
        <AppImage
          is-lazy-loading="true"
          :image="data.promo_image.image"
          :imageType="WPImageType.oneFourthScreen"
          class="w-1/2 inline-flex self-end aspect-[1/1] object-cover"
        />
        <h6 v-if="data.promo_title" class="animated-text uppercase text-3.5 leading-tight font-medium mt-4 mb-5">{{ data.promo_title }}</h6>
        <span v-if="data.promo_link_text" class="animated-text text-3.5 mb-4">{{ data.promo_link_text }}</span>
        <!-- <AppLink :to="routeLink">
          <AppImage
            is-lazy-loading="true"
            :image="data.promo_image.image"
            :imageType="WPImageType.oneFourthScreen"
            class="w-1/2 inline-flex self-end aspect-[1/1] object-cover"
          />
          <h6 v-if="data.promo_title" class="animated-text uppercase text-3.5 leading-tight font-medium mt-4 mb-5">{{ data.promo_title }}</h6>
          <span v-if="data.promo_link_text" class="animated-text text-3.5 mb-4">{{ data.promo_link_text }}</span>
          <button v-if="type === 'txt_img_sngl_withpromo_apart' || type === 'txt_img_dbl_promo_apart'" class="animated-text flex items-center justify-center gap-4 transition-all">
            <span class="py-1 px-2 rounded-full border border-black bg-white">
              <ArrowIcon class="w-2.5 -rotate-90 text-black" /> 
            </span>
            <span class="uppercase font-medium text-3.5">
              Read More
            </span>
          </button>
        </AppLink> -->
      </div>

      <div v-if="type === 'txt_img_dbl_promo_neighb' || type === 'txt_img_sngl_withpromo_location'">
        <div class="DynamicTextImage__video relative mb-3" @click="openSingleModal(data.video_id ? data.video_id : data.promo_popup_image.image ? data.promo_popup_image.image : data.promo_image.image)">
          <AppImage
            is-lazy-loading="true"
            :image="data.promo_image.image"
            :imageType="WPImageType.oneFourthScreen"
            class="aspect-[1/1] w-full object-cover inline-flex self-end"
          />
          <NuxtImg v-if="data.video_id" src="/svg/play.svg" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-15" loading="lazy" alt="Play icon" />
        </div>
        <h6
          v-if="data.promo_title"
          class="animated-text uppercase text-4.5 font-medium tracking-tigh mb-1"
          :class="[
            { 'text-center': type === 'txt_img_dbl_promo_neighb' },
            { 'text-left': type === 'txt_img_sngl_withpromo_location' },
          ]"
        >
          {{ data.promo_title }}
        </h6>
        <span v-if="data.promo_link_text" class="animated-text block text-center text-3.5">{{ data.promo_link_text }}</span>
        <button v-if="type === 'txt_img_sngl_withpromo_location'" class="animated-text mt-3 py-2 px-5.5 rounded-full border border-black bg-white hover:bg-black hover:[&>svg]:text-white transition-all" @click="openSingleModal(data.promo_popup_image.image ? data.promo_popup_image.image : data.promo_image.image)">
          <ArrowIcon class="w-3 -rotate-90 text-black" />  
        </button>
      </div>
    </template>
  </section>

  <ClientOnly>
    <Teleport to="body">
      <AppGalleryModal v-if="isGalleryActive" @close-modal="closeModal" :galleryItems="[modalData]" />
    </Teleport>
  </ClientOnly>
</template>

<script setup>
  import ArrowIcon from '@/public/svg/arrow-down.svg'

  import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { WPImageType } from '~/types/enums/wp-image-type'

  const props = defineProps({
    data: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: '',
    },
    paddings: {
      type: Object,
      default: () => {}
    },
  })

  const isDesktop = ref(false)
  const modalData = ref(null)
  const isGalleryActive = ref(false)
  const animatedSection = ref(null)

  const onResize = () => {
    isDesktop.value = window.innerWidth >= 768
  }

  const openSingleModal = (data) => {
    isGalleryActive.value = true
    if (typeof data === 'string') {
      modalData.value = { vimeo_id: data }
    } else {
      console.log(props.data);
      
      modalData.value = data
    }
  }

  const closeModal = () => {
    isGalleryActive.value = false
  }

  const routeLink = computed(() => {
    return props.data?.link?.internal ? new URL(props.data?.link.internal).pathname : '#BAD_URL'
  })

  onMounted(async () => {
    window.addEventListener('resize', onResize)
    onResize()

    gsap.registerPlugin(ScrollTrigger)

    await nextTick()

    const waitForImages = new Promise((resolve) => {
      const images = animatedSection.value.querySelectorAll('img')
      let loadedImages = 0
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++
        } else {
          img.addEventListener('load', () => {
            loadedImages++
            if (loadedImages === images.length) resolve()
          })
          img.addEventListener('error', () => {
            loadedImages++
            if (loadedImages === images.length) resolve()
          })
        }
      })
      if (loadedImages === images.length) resolve()
    })

    await waitForImages

    gsap.fromTo(
      animatedSection.value.querySelectorAll('img'), 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: .6, 
        stagger: 0.3, 
        scrollTrigger: {
          trigger: animatedSection.value,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      }
    );

    gsap.fromTo(
      animatedSection.value.querySelectorAll('.animated-text'), 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: .7, 
        stagger: 0.1, 
        scrollTrigger: {
          trigger: animatedSection.value,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      }
    );
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })
</script>

<style lang="scss" scoped>
  .DynamicTextImage {
    &__video {
      cursor: pointer;
      overflow: hidden;
      background: transparent;
      transition: background .5s ease;

      img:first-of-type {
        opacity: inherit;
        transform: scale(1);
        transition: all .5s ease;
      }

      &:hover {
        background:var(--black);

        img:first-of-type {
          transform: scale(1.1) !important;
          opacity: .6 !important;
        }
      }
    }
  }
</style>