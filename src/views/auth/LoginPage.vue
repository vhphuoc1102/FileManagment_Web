<script lang="ts" setup>
import { ref } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { loginApi } from '@/apis/auth'
import type { AuthRequest } from '@/apis/auth/request'
import router from '@/router'

const formData = ref<AuthRequest>({
  email: '',
  password: ''
})

const resolver = zodResolver(
  z.object({
    email: z.string().min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  })
)

const onSubmit = async (e: any) => {
  if (e.valid) {
    await loginApi(e.values)
  }
}

const onGoogleLogin = async () => {
}

const onRegister = () => {
  router.replace('/signup')
}
</script>

<template>
  <div class="flex min-h-screen justify-center items-center">
    <Form v-slot="$form" :initialValues="formData" :resolver
          class="flex flex-col gap-5 w-full sm:w-96 border px-8 pt-4 pb-5 rounded-xl shadow"
          @submit="onSubmit">
      <div class="flex w-full justify-center">
        <span class="text-2xl font-semibold">Login</span>
      </div>
      <div class="flex flex-col gap-1">
        <InputText fluid name="email" placeholder="Email" type="text" />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message
          }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <Password :feedback="false" fluid name="password" placeholder="Password" toggleMask />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          <ul class="my-0 px-4 flex flex-col gap-1">
            <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
          </ul>
        </Message>
      </div>
      <div class="flex flex-col gap-3">
        <Button label="Login" severity="secondary" type="submit" />
        <span class="text-sm font-semibold cursor-pointer">Forget password ?</span>
      </div>
      <Divider :pt:root:class="'my-0'" align="center" type="solid">
        <p>Or</p>
      </Divider>
      <Button icon="pi pi-google" label="Login with google" @click="onGoogleLogin" />
      <div class="text-sm font-medium">
        Don't have an account ? <span class="text-sm font-semibold cursor-pointer" @click="onRegister"> Register </span>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>
