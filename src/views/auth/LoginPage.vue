<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const toast = useToast();

const formData = ref({
  email: '',
  password: ''
});

const resolver =  zodResolver(
  z.object({
    email: z.string().min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  })
);

const onSubmit = async () => {}

const onGoogleLogin = async () => {}
</script>

<template>
  <div class="flex min-h-screen justify-center items-center">
    <Toast />
    <Form v-slot="$form" :resolver :formData @submit="onSubmit" class="flex flex-col gap-5 w-full sm:w-96 border px-8 pt-4 pb-5 rounded-xl shadow">
      <div class="flex w-full justify-center">
        <span class="text-2xl font-semibold">Login</span>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="Email" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          <ul class="my-0 px-4 flex flex-col gap-1">
            <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
          </ul>
        </Message>
      </div>
      <div class="flex flex-col gap-3">
        <Button type="submit" severity="secondary" label="Login"/>
        <span class="text-sm font-semibold cursor-pointer">Forget password ?</span>
      </div>
      <Divider align="center" type="solid" :pt:root:class="'my-0'">
        <p>Or</p>
      </Divider>
      <Button label="Login with google" @click="onGoogleLogin" icon="pi pi-google"/>
      <div class="text-sm font-medium">
        Don't have an account ? <span class="text-sm font-semibold cursor-pointer"> Register </span>
      </div>
    </Form>
  </div>
</template>

<style scoped>

</style>
