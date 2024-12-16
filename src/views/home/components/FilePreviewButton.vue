<template>
  <button aria-label="Info" autofocus class="p-image-action"
          data-pc-section="infobutton"
          type="button" @click="onClick">
    <svg aria-hidden="true" class="p-icon" data-pc-section="infobutton" fill="none" height="15"
         viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_5_6)">
        <path
          d="M6.5625 5.5625L6.58642 5.55083C6.66122 5.51346 6.74516 5.49831 6.8283 5.50717C6.91145 5.51604 6.99031 5.54854 7.05556 5.60083C7.1208 5.65313 7.1697 5.72302 7.19645 5.80224C7.2232 5.88146 7.22669 5.96669 7.2065 6.04783L6.7935 7.70217C6.77317 7.78335 6.77655 7.86866 6.80324 7.94798C6.82993 8.0273 6.87881 8.0973 6.94408 8.14968C7.00935 8.20206 7.08828 8.23461 7.1715 8.24349C7.25471 8.25236 7.33873 8.23718 7.41358 8.19975L7.4375 8.1875M12.25 6C12.25 6.68944 12.1142 7.37213 11.8504 8.00909C11.5865 8.64605 11.1998 9.2248 10.7123 9.71231C10.2248 10.1998 9.64605 10.5865 9.00909 10.8504C8.37213 11.1142 7.68944 11.25 7 11.25C6.31056 11.25 5.62787 11.1142 4.99091 10.8504C4.35395 10.5865 3.7752 10.1998 3.28769 9.71231C2.80018 9.2248 2.41347 8.64605 2.14963 8.00909C1.8858 7.37213 1.75 6.68944 1.75 6C1.75 4.60761 2.30312 3.27226 3.28769 2.28769C4.27226 1.30312 5.60761 0.75 7 0.75C8.39239 0.75 9.72774 1.30312 10.7123 2.28769C11.6969 3.27226 12.25 4.60761 12.25 6ZM7 3.8125H7.00467V3.81717H7V3.8125Z"
          shape-rendering="crispEdges" stroke="white" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="1.5" />
      </g>
      <defs>
        <filter id="filter0_d_5_6" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="20"
                width="20" x="-3"
                y="0">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix"
                         values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_5_6" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_5_6" mode="normal" result="shape" />
        </filter>
      </defs>
    </svg>

  </button>
</template>

<script lang="ts" setup>
const onClick = (event: MouseEvent) => {
  event.preventDefault()
}
</script>

<style scoped>

</style>
