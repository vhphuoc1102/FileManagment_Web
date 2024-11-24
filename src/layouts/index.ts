import { type Component, defineAsyncComponent } from 'vue'

export default async function getLayout(metaLayout: string | undefined): Promise<Component> {
  try {
    const component = metaLayout && await import(`./${metaLayout}.vue`);
    return component?.default || defineAsyncComponent(() => import('@/layouts/plain/PlainLayout.vue'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return defineAsyncComponent(() => import('@/layouts/plain/PlainLayout.vue'));
  }
}
