<script setup lang="ts">
import Helper from "@helper/core"
import {onMounted} from "vue"

onMounted(() => {
  new Helper({
    selector: "#app",
  })
})
</script>

<template>
  <div class="test"> 
    main
  </div>
</template>