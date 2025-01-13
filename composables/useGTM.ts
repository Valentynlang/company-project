import { useGtm as useVueGtm } from '@gtm-support/vue-gtm'

export default () => {
  const gtm = useVueGtm()
  return gtm;
}