import { ToastEventBus } from 'primevue'

const DEFAULT_LIFE_TIME: number = 4000

export function info(summary: string, detail: string, life: number = DEFAULT_LIFE_TIME) {
  ToastEventBus.emit('add', { severity: 'info', summary, detail, life })
}

export function warn(summary: string, detail: string, life: number = DEFAULT_LIFE_TIME) {
  ToastEventBus.emit('add', { severity: 'warn', summary, detail, life })
}

export function success(summary: string, detail: string, life: number = DEFAULT_LIFE_TIME) {
  ToastEventBus.emit('add', { severity: 'success', summary, detail, life })
}

export function error(summary: string, detail: string, life: number = DEFAULT_LIFE_TIME) {
  ToastEventBus.emit('add', { severity: 'error', summary, detail, life })
}
