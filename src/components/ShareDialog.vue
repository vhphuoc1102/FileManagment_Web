<template>
  <div>
    <Dialog v-model:visible="visible" :blockScroll="true" :closable="false" :dismissableMask="true" :draggable="false"
            :pt="{
            content: {
              class: 'flex flex-col gap-5 w-[40rem]'
            }
          }" header="Share image" modal>
      <RadioButtonGroup v-model="privacy" class="flex flex-wrap gap-4" name="Share"
                        @update:model-value="clearShareInfo">
        <div class="flex items-center gap-2">
          <RadioButton :value="-1" inputId="notShare" />
          <label for="notShare">Not Share</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton :value="1" inputId="public" />
          <label for="public">Share Public</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton :value="0" inputId="private" />
          <label for="private">Share Private</label>
        </div>
      </RadioButtonGroup>
      <div v-if="privacy === SHARE.SHARE_PRIVATE" class="flex flex-col gap-3">
        <div>
          <div class="flex gap-3">
            <InputText id="email-input-text" v-model="inputEmail" class="w-full" placeholder="Email"
                       @keydown.enter="enterEmail" />
            <Button :pt="{
              root: {
                class: 'px-6'
              }
            }" icon="pi pi-plus" label="Add" @click="enterEmail" />
          </div>
          <Message v-if="!isEmailNotValid" severity="error" size="small" variant="simple">
            {{ messageError }}
          </Message>
        </div>
        <div class="flex flex-wrap gap-1">
          <Chip v-for="(email, index) in emails" :key="index" :label="email" removable @remove="closeChip(index)" />
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" type="button" @click="close" />
        <Button label="Save" type="button" @click="onSave" />
      </div>
    </Dialog>
    <ShareDialogPublic v-if="publicVisible" v-model="publicVisible" :share-code="shareCode" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, unref, watch } from 'vue'
import type { AddShareRequest } from '@/apis/share/request'
import * as shareApi from '@/apis/share'
import { SHARE } from '@/constants'
import ShareDialogPublic from '@/components/ShareDialogPublic.vue'
import { validateEmail } from '@/utils/mail.util'
import * as toast from '@/composables/toast'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const visible = defineModel<boolean | undefined>()
const publicVisible = ref<boolean>(false)
const privacy = ref<number>(SHARE.NOT_SHARE)
const shareCode = ref<string>('')
const emails = ref<string[]>([])
const inputEmail = ref<string>('')
const isEmailNotValid = ref<boolean>(false)
const messageError = ref('')
const userStore = useUserStoreWithOut()
const { loadStart, loadDone } = usePageLoading()

const props = defineProps({
  resourceId: {
    type: Number,
    required: true
  },
  resourceKind: {
    type: Number,
    required: true
  }
})

const shareInfo = ref<AddShareRequest>({
  resourceId: props.resourceId,
  resourceKind: props.resourceKind,
  privacy: privacy.value,
  expiredTs: undefined,
  emails: []
})

const savedShareInfo = ref<AddShareRequest>({
  resourceId: props.resourceId,
  resourceKind: props.resourceKind,
  privacy: privacy.value,
  expiredTs: undefined,
  emails: []
})

onMounted(async () => {
  clearShareInfo()
  try {
    loadStart()
    await shareApi.getShare({
      resourceId: props.resourceId,
      resourceKind: props.resourceKind
    }).then((response) => {
      privacy.value = response.privacy
      if (privacy.value === SHARE.SHARE_PRIVATE) {
        emails.value = response.emails
        shareInfo.value.emails = emails.value
        savedShareInfo.value.emails = [...response.emails]
      }
    })
  } finally {
    loadDone()
  }
})

watch(() => privacy.value, (newPrivacy) => {
  shareInfo.value.privacy = newPrivacy
  // Clear error message and validation state when privacy changes
  messageError.value = ''
  isEmailNotValid.value = false
})

const clearShareInfo = () => {
  inputEmail.value = ''
  isEmailNotValid.value = false
  emails.value = []
  shareInfo.value = {
    resourceId: props.resourceId,
    resourceKind: props.resourceKind,
    privacy: privacy.value,
    expiredTs: undefined,
    emails: []
  }

  if (privacy.value === SHARE.SHARE_PRIVATE) {
    shareInfo.value.emails = [...savedShareInfo.value.emails]
    emails.value = [...savedShareInfo.value.emails]
  }
}

const onSave = async () => {
  if (privacy.value === SHARE.SHARE_PRIVATE && (!emails.value || emails.value.length === 0)) {
    toast.error('Error', 'Please enter email')
    return
  }
  if (shareInfo.value) {
    shareInfo.value.privacy = privacy.value
    await shareApi.share(shareInfo.value).then(
      (response) => {
        if (response.privacy === SHARE.SHARE_PUBLIC) {
          shareCode.value = response.shareCode
          publicVisible.value = true
        }

        if (response.privacy === SHARE.SHARE_PRIVATE) {
          toast.success('Share private successfully', '')
          close()
        }

        if (response.privacy === SHARE.NOT_SHARE) {
          toast.success('Private file successfully', '')
          close()
        }
      }
    )
  }
}


const enterEmail = () => {
  const inputEmailValue = unref(inputEmail)
  if (inputEmailValue) {
    if (validateErrorEmail(inputEmailValue)) {
      emails.value.push(inputEmailValue)
      shareInfo.value.emails = emails.value
      inputEmail.value = ''
    }
  }
}

const validateErrorEmail = (inputEmailValue: string) => {
  if (!validateEmail(inputEmailValue)) {
    messageError.value = 'Email is not valid'
    isEmailNotValid.value = false
    return false
  }
  if (userStore.getUserInfo?.email === inputEmailValue) {
    messageError.value = 'You can not share with yourself'
    isEmailNotValid.value = false
    return false
  }
  if (emails.value.includes(inputEmailValue)) {
    messageError.value = 'Email is already exist'
    isEmailNotValid.value = false
    return false
  }
  isEmailNotValid.value = true
  return true
}

const closeChip = (index: number) => {
  emails.value.splice(index, 1)
  shareInfo.value.emails = emails.value
}

const close = () => {
  visible.value = false
}
</script>

<style scoped>

</style>
