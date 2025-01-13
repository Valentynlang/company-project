import { computed } from 'vue'

export function useRouteLink(button: any) {
  const routeLink = computed(() => {
    if (button?.type === 'external') return button.external || '#BAD_URL'
    else if (button?.type === 'custom') return button?.custom || '#BAD_URL'
    else if (button?.type === 'internal') return button?.internal ? new URL(button.internal).pathname : '#BAD_URL'
    return '#BAD_URL'
  })

  return {
    routeLink,
  }
}