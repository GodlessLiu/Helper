<script setup lang="ts">
import Helper from "@helper/core"
import {onMounted} from "vue"

onMounted(() => {
  new Helper({
    name:"laf"
  })
})
</script>

<template>
  <div>
    main
  </div>
</template>