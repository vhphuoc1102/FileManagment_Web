<template>
  <div class="card flex justify-center">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-4 justify-center items-center">
        <Avatar class="mr-2" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"
                size="xlarge" @click="backHome" />
        <span class="text-4xl font-bold">Username</span>
      </div>
      <Form :initialValues="userInfo" :resolver class="card grid grid-cols-1 md:grid-cols-2 gap-4 w-full sm:w-96"
            @submit="onFormSubmit">
        <FormField v-slot="$field" class="flex flex-col gap-1 col-span-2" initialValue=""
                   name="username">
          <InputText v-model="userInfo.username" placeholder="Username" type="text" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}
          </Message>
        </FormField>
        <FormField v-slot="$field" class="flex flex-col gap-1 col-span-2" initialValue=""
                   name="email">
          <InputText v-model="userInfo.email" :disable="isEmailDisable" placeholder="Email" type="text" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}
          </Message>
        </FormField>
        <FormField v-slot="$field" class="flex flex-col gap-1 col-span-2" initialValue=""
                   name="phone">
          <InputText v-model="userInfo.phone" :disabled="isPhoneDisable" placeholder="Phone" type="text" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}
          </Message>
        </FormField>
        <FormField v-slot="$field" class="flex flex-col gap-1" initialValue=""
                   name="firstname">
          <InputText v-model="userInfo.firstName" placeholder="First Name" type="text" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}
          </Message>
        </FormField>
        <FormField v-slot="$field" class="flex flex-col gap-1" initialValue=""
                   name="lastname">
          <InputText v-model="userInfo.lastName" placeholder="Last Name" type="text" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}
          </Message>
        </FormField>
        <div class="col-span-2 grid grid-cols-2 gap-4">
          <Button label="Back" severity="secondary" @click="backHome" />
          <Button label="Save" severity="success" type="submit" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { getMeApi, updateInfo } from '@/apis/auth'
import type { UserInfoResponse } from '@/apis/auth/response'

const toast = useToast()
const router = useRouter()
const userInfo = ref<UserInfoResponse>({
  username: '',
  email: '',
  phone: '',
  firstName: '',
  lastName: ''
})
const isPhoneDisable = computed(() => userInfo.value.phone === '')
const isEmailDisable = computed(() => userInfo.value.email === '')
const onFormSubmit = async (e: any) => {
  if (e.valid) {
    await updateInfo({
      firstName: e.states.firstname.value,
      lastName: e.states.lastname.value,
      username: e.states.username.value
    }).then(
      () =>
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
    )
  }
}

const backHome = () => {
  router.replace('/')
}

onMounted(async () => {
  const result = await getMeApi()
  if (result) {
    userInfo.value = result
  }
})
</script>
