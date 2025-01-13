<template>
  <section ref="section" class="RegisterForm py-12 md:py-28 max-md:px-5 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 hd_clamp">
    <div class="md:col-start-2 md:col-end-7">
      <div ref="registerFormLeftBox" class="mb-16 opacity-0">
        <h6 class="font-secondary text-8 mb-14 md:max-w-xl leading-tight" v-html="data.intro">
        </h6>
    
        <div class="[&>p]:mt-0 mb-7" v-html="data.pricing" />
      </div>

      <form ref="registerFormBox" class="grid opacity-0 grid-cols-1 md:grid-cols-2 gap-6 [&>div]:flex [&>div]:flex-col">
        <div>
          <label class="label-form" for="name">First name <span class="info-red">*</span></label>
          <input class="input" id="name" v-model="firstName" type="text" placeholder="First name">
        </div>
        <div>
          <label class="label-form" for="last_name">Last name <span class="info-red">*</span></label>
          <input class="input" id="last_name" v-model="lastName" type="text" placeholder="Last name">
        </div>
        <div>
          <label class="label-form" for="email">Email <span class="info-red">*</span></label>
          <input class="input" id="email" type="email" v-model="email" placeholder="Email">
        </div>
        <div>
          <label class="label-form" for="phone">Phone <span class="info-red">*</span></label>
          <input class="input" id="phone" type="tel" v-model="phone" placeholder="Phone" @input="filterNumericInput">
        </div>


        <div class="md:col-span-2">
          <label class="label-form">Select your country of residence <span class="info-red">*</span></label>
          <select
            v-model="country"
            id="country"
            class="input"
          >
            <option
              v-for="item in countryList"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>


        <div class="md:col-span-2">
          <label class="label-form">How did you hear about us? <span class="info-red">*</span></label>
          <select
            v-model="leadSourceDetail"
            id="leadSourceDetail"
            class="input"
          >
            <option
              v-for="item in leadSourceDetailsList"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="label-form">How can we help?</label>
          <select
            v-model="howCanHelp"
            id="howCanHelp"
            class="input"
          >
            <option
              v-for="item in howCanHelpList"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        
        <div class="md:col-span-2">
          <label class="label-form" for="location">Please specify your query here</label>
          <textarea class="input resize-none" v-model="query" id="location" rows="10" placeholder="Add your message"></textarea>
        </div>

        <p class="md:col-span-2">We take your privacy seriously and will only use your personal information to administer your account and to provide you with information on upcoming developments, new releases or events relating to your property search. If you consent to us contacting you for the purposes specified, please tick to let us know how you prefer to be contacted:</p>

        <div class="md:col-span-2">
          <div class="flex gap-4">
            <label>
              1. Email<span class="info-red">*</span>:
            </label>

            <div class="flex items-center">
              <input id="email_opt_in" type="radio" value="Opt in" v-model="emailService" name="emailService" class="w-4 h-4 accent-blue-500 bg-gray-100 border-gray-300 ring-0 !accent-black">
              <label for="email_opt_in" class="ms-1.5 text-4 text-black">Opt in</label>
            </div>
            <div class="flex items-center">
              <input id="email_opt_out" type="radio" value="Opt out" v-model="emailService" name="emailService" class="w-4 h-4 accent-blue-500 bg-gray-100 border-gray-300 ring-0 !accent-black">
              <label for="email_opt_out" class="ms-1.5 text-4 text-black">Opt out</label>
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <div class="flex gap-4">
            <label>
              2. SMS<span class="info-red">*</span>:
            </label>
            
            <div class="flex items-center">
              <input id="sms_opt_in" type="radio" value="Opt in" v-model="smsService" name="smsService" class="w-4 h-4 accent-blue-500 bg-gray-100 border-gray-300 ring-0 !accent-black">
              <label for="sms_opt_in" class="ms-1.5 text-4 text-black">Opt in</label>
            </div>
            <div class="flex items-center">
              <input id="sms_opt_out" type="radio" value="Opt out" v-model="smsService" name="smsService" class="w-4 h-4 accent-blue-500 bg-gray-100 border-gray-300 ring-0 !accent-black">
              <label for="sms_opt_out" class="ms-1.5 text-4 text-black">Opt out</label>
            </div>
          </div>
        </div>
          
        <p class="md:col-span-2">The information you provide is used to improv e the service we offer and will not be sold to any other company, further information can be found within our Privacy Policy, however from time to time, you may be contacted about future developments connected with Ballymore Development Management Ltd, falling within the Ballymore brand. If you change your mind about your marketing preferences or wish to rectify any of your personal data please let us know by contacting the Data Protection Officer, Data Department, Ballymore Development Management Ltd, 161 Marsh Wall, London E14 9S). E: datadepartment@ballymoregroup.com</p>

        <div v-if="Object.keys(errors).length" class="md:col-span-2 bg-gray rounded-lg p-4">
          <ul class="flex flex-col gap-2">
            <li v-for="(message, field) in errors" :key="field" class="text-red text-4">
              {{ message }}
            </li>
          </ul>
        </div>

        <div v-if="resMessage" class="md:col-span-2 bg-gray rounded-lg p-4">
           <p class="text-5 font-medium">{{ resMessage }}</p>
        </div>
        
        <AppButton text="SUBMIT" class="max-w-52" color="black" size="large" :disabled="isLoading" @click.prevent="submitForm()" />
      </form>
    </div>

    <div id="container" class="md:col-start-8 md:col-end-12 h-full relative flex flex-col gap-12 justify-between">
      <div ref="stickyElement" class="relative md:sticky ">
        <div ref="registerFormStickyBox" class="RegisterForm__panel opacity- md:top-0 flex flex-col gap-7 py-5 md:py-8 px-6 md:px-10 bg-gray rounded-lg">
          <h6 class="text-8 md:text-11 uppercase font-bold text-black" v-html="data.title" />

          <div class="flex flex-col gap-2">
            <!--<a href="/" class="flex items-center gap-3 hover:underline text-4 md:text-5">
              <ChatIcon class="w-3 sm:w-6 text-aqua_blue" />
              <span>Live Chat</span>
            </a>-->
            <a href="tel:02085697775" class="flex items-center gap-3 hover:underline text-4 md:text-5">
              <PhoneIcon class="w-3 sm:w-6 text-aqua_blue" />
              <span class="rTapNumber375523">020 8569 7775</span>
            </a>

            <a href="mailto:theteam@thebrentfordproject.com" class="flex items-center gap-3 hover:underline text-4 md:text-5">
              <MailIcon class="w-3 sm:w-6 text-aqua_blue" />
              <span>theteam@thebrentfordproject.com</span>
            </a>
          </div>

          <div class="[&>p]:mt-0" v-html="data.hours" />
          <div class="[&>p]:mt-0" v-html="data.retail" />
          </div>
        </div>

      <div ref="endElement" >
        <div ref="registerFormEndBox" class="opacity- flex flex-col gap-8">
          <div>
            <BallymoreLogo class="h-16 text-black" />
          </div>
          <p>Ballymore is an independently-minded, multi award-winning property developer with a portfolio of some of Europe's largest urban development projects first founded by Chairman and CEO Sean Mulryan in Dublin in 1982.</p>

          <div class="hidden flex gap-4 items-center">
            <span>Share:</span>
            <div class="flex gap-2">
              <button class="h-8 w-8 rounded-full flex items-center justify-center border border-light_gray p-2">
                <XIcon class="text-black h-4" />
              </button>

              <button class="h-8 w-8 rounded-full flex items-center justify-center border border-light_gray p-2">
                <FacebookIcon class="text-black h-4" />
              </button>
              <button class="h-8 w-8 rounded-full flex items-center justify-center border border-light_gray p-2">
                <LinkedinIcon class="text-black h-4" />
              </button>
              <button class="h-8 w-8 rounded-full flex items-center justify-center border border-light_gray p-2">
                <InstagramIcon class="text-black h-4" />
              </button>
            </div>
          </div>
          <span>@ballymore</span>
          </div>
        </div>
        
    </div>
  </section>
</template>

<script setup>
  import BallymoreLogo from '@/public/svg/ballymore-logo.svg'
  import ChatIcon from '@/public/svg/chat.svg'
  import MailIcon from '@/public/svg/mail.svg'
  import PhoneIcon from '@/public/svg/phone.svg'

  import XIcon from '@/public/svg/x.svg'
  import LinkedinIcon from '@/public/svg/linkedin.svg'
  import FacebookIcon from '@/public/svg/facebook.svg'
  import InstagramIcon from '@/public/svg/instagram.svg'
  
  import { howCanHelpList, leadSourceDetailsList, countryList } from '@/constants/form'

  import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue'
  import { useForm, useField } from 'vee-validate'
  import * as yup from 'yup'

  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  defineProps({
    data: {
      type: Object,
      default: () => {}
    }
  })

  const isLoading = ref(false)
  const isDesktop = ref(false)
  const section = ref(null)
  const stickyElement = ref(null)
  const endElement = ref(null)
  const registerFormLeftBox = ref(null); 
  const registerFormBox = ref(null); 
  const registerFormStickyBox = ref(null);
  const registerFormEndBox = ref(null);
  const resMessage = ref('');

  const { handleSubmit, resetForm, errors } = useForm()

  const { value: firstName } = useField('first_name', yup.string().required('Please enter your First name'))
  const { value: lastName } = useField('last_name', yup.string().required('Please enter your Last name '))
  const { value: phone } = useField('phone', yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits'))
  const { value: email } = useField('email', yup.string().email('Must be a valid email').required('Please enter your email address'))
  const { value: query } = useField('query', yup.string())
  const { value: leadSourceDetail } = useField('leadSourceDetail', yup.string().required('Please select an option from How did you hear about Us?'))
  const { value: howCanHelp } = useField('howCanHelp', yup.string())
  const { value: country } = useField('country', yup.string().required('Please enter your Country'))
  const { value: emailService } = useField('emailService', yup.string().required('Please select your Email preference'))
  const { value: smsService } = useField('smsService', yup.string().required('Please select your SMS preference'))


  const filterNumericInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, '')
    phone.value = event.target.value
  }

  const submitForm = handleSubmit(async(values) => {
    isLoading.value = true
    resMessage.value = 'Sending your enquiry, please wait..'

    const formData = new FormData();

    formData.append('First Name', values.first_name);
    formData.append('Last Name', values.last_name);
    formData.append('Email Address', values.email);
    formData.append('Mailing Country', values.country);
    formData.append('Phone', values.phone);
    formData.append('Lead Source Detail', values.leadSourceDetail);
    formData.append('Marketing Opt In', values.emailService === 'Opt in' ? '1' : '0');
    formData.append('SMS Opt In', values.smsService === 'Opt in' ? '1' : '0');
    formData.append('Marketing Opt Out', values.emailService === 'Opt out' ? '1' : '0');
    formData.append('SMS Opt Out', values.smsService === 'Opt out' ? '1' : '0');
    formData.append('Method of Contact', 'Web');
    formData.append('Lead Source', 'Web BF');
    formData.append('Development of Interest', 'Brentford');
    formData.append('Act-On Form Type', 'TBP GiT');
    formData.append('How can we help', values.howCanHelp);
    formData.append('Description', values.query);


    const urlParams = new URLSearchParams(window.location.search)


    //if(urlParams.has('gclid')){
      formData.append('GCLID', urlParams.get('gclid'));
      formData.append('FBCLID', urlParams.get('fbclid'));
      formData.append('First Click Campaign', urlParams.get('FirstClickCampaign'));
      formData.append('First Click Channel', urlParams.get('FirstClickContent'));
      formData.append('First Click Channel', urlParams.get('FirstClickChannel'));
      formData.append('First Click Landing Page', urlParams.get('FirstClickLandingPage'));
      formData.append('First Click Medium', urlParams.get('FirstClickMedium'));
      formData.append('First Click Referrer', urlParams.get('FirstClickReferrer'));
      formData.append('First Click Source', urlParams.get('FirstClickSource'));
      formData.append('First Click Term', urlParams.get('FirstClickTerm'));
      formData.append('Google Analytics Campaign', urlParams.get('GoogleAnalyticsCampaign'));
      formData.append('Google Analytics Client ID', urlParams.get('GoogleAnalyticsClientID'));
      formData.append('Google Analytics Content', urlParams.get('GoogleAnalyticsContent'));
      formData.append('Google Analytics Medium', urlParams.get('GoogleAnalyticsMedium'));
      formData.append('Google Analytics Link', urlParams.get('GoogleAnalyticsLink'));
      formData.append('Google Analytics Source', urlParams.get('GoogleAnalyticsSource'));
      formData.append('Google Analytics Term', urlParams.get('GoogleAnalyticsTerm'));
      formData.append('IP Address', urlParams.get('IPAddress'));
      formData.append('Last Click Campaign', urlParams.get('LastClickCampaign'));
      formData.append('Last Activity', urlParams.get('LastActivity'));
      formData.append('Last Click Channel', urlParams.get('LastClickChannel'));
      formData.append('Last Click Content', urlParams.get('LastClickContent'));
      formData.append('Last Click Referrer', urlParams.get('LastClickReferrer'));

      formData.append('Last Click Medium', urlParams.get('LastClickMedium'));
      formData.append('Last Click Source', urlParams.get('LastClickSource'));
      formData.append('Last Click Landing Page', urlParams.get('LastClickLandingPage'));
      formData.append('Last Click Term', urlParams.get('LastClickTerm'));
      formData.append('Time Spent on Website', urlParams.get('TimeSpentonWebsite'));

      formData.append('Number of Website Visits', urlParams.get('NumberofWebsiteVisits'));
      formData.append('Operating System', urlParams.get('OperatingSystem'));
      formData.append('Time Zone', urlParams.get('TimeZone'));

    //}

    const serializedData = new URLSearchParams(formData).toString();

    try {
      await $fetch('https://weare.ballymoregroup.com/acton/eform/42807/cb12f366-fc98-482e-b0d5-8d5170bcc441/d-ext-0001', {
        method: 'POST',
        body: serializedData,
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      }).then(() => {


       dataLayer.push({ event: 'submit_success' })
       fbq('track', 'ami_formsubmit')
        resMessage.value = 'Your enquiry was sent successfully. One of the team will be in touch soon!'
        isLoading.value = false
        resetForm()
      })
    } catch (error) {
      resetForm()
      resMessage.value = 'Something went wrong. Please try later...'
      
      setTimeout(() => {
        isLoading.value = false
        resMessage.value = ''
      }, 8000);
    }
    
  }, errors => {})

  const animateComponent = () => {
    setTimeout(() => {
      if (isDesktop.value) {
        if (registerFormBox.value) {
          gsap.to(
            registerFormBox.value,
            {
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: section.value,
                start: 'top bottom'
              }
            }  
          );
        }
        if (registerFormEndBox.value) {
          gsap.fromTo(
            registerFormEndBox.value,
            {
              y: 50,
              opacity: 0
            },
            {
              y: 0,
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: registerFormEndBox.value,
                start: 'top bottom',
              }
            }  
          );
        }
        if (registerFormStickyBox.value) {
          gsap.fromTo(
            registerFormStickyBox.value,
            {
              y: 50,        
              opacity: 0
            },
            {
              y: 0,
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: registerFormStickyBox.value,
                start: 'top bottom'
              }
            }  
          );
        }
        if (registerFormLeftBox.value) {
          gsap.fromTo(
            registerFormLeftBox.value,
            {
              x: -50,        
              opacity: 0
            },
            {
              x: 0,
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: section.value,
                start: 'top bottom'
              }
            }  
          );
        } 
      } else {
        if (registerFormBox.value) {
          gsap.to(
            registerFormBox.value,
            {
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: section.value,
                start: 'top bottom'
              }
            }  
          );
        }
        if (registerFormEndBox.value) {
          gsap.to(
            registerFormEndBox.value,
            {
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: registerFormEndBox.value,
                start: 'top bottom',
              }
            }  
          );
        }
        if (registerFormStickyBox.value) {
          gsap.to(
            registerFormStickyBox.value,
            {
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: registerFormStickyBox.value,
                start: 'top bottom'
              }
            }  
          );
        }
        if (registerFormLeftBox.value) {
          gsap.to(
            registerFormLeftBox.value,
            {
              delay: 0.3,
              duration: 1,
              opacity: 1,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: section.value,
                start: 'top bottom'
              }
            }  
          );
        } 
      }
    }, 1000);
  }
  const onResize = () => {
    isDesktop.value = window.innerWidth >= 768

    const stickyTrigger = ScrollTrigger.getById('stickyTrigger')
    if (stickyTrigger) {
      stickyTrigger.kill()
    }
    gsap.set(stickyElement.value, { clearProps: "all" })
    
    animateComponent()  

    if (isDesktop.value) {
      gsap.registerPlugin(ScrollTrigger)

      const stickyHeight = stickyElement.value.offsetHeight

      gsap.to(stickyElement.value, {
        scrollTrigger: {
          trigger: stickyElement.value,
          start: "top top",
          endTrigger: endElement.value,
          end: () => `top-=${stickyHeight} top`,
          pin: true,
          pinSpacing: false,
          id: 'stickyTrigger'
        }
      })
    }
  }

  onMounted(async() => {
    gsap.registerPlugin(ScrollTrigger)

    window.addEventListener('resize', onResize)

    await nextTick()
    onResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
</script>

<style lang="scss">
  .RegisterForm {
    strong {
      font-weight: 500;
    }

    &__panel {
      p {
        strong {
          display: block;
          font-weight: 500;
          font-size: 0.875rem;
          text-transform: uppercase;
          margin-bottom: 0.750rem;
        }
      }
    }

    .info-red {
      color: red;
    }
  }
</style>
