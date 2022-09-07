<template>
  <router-view></router-view>
</template>

<script>
import { allChannelListAPI } from '@/api/index'
export default {
  async created () {
    const result = await allChannelListAPI()
    console.log(result)
  }
}
</script>

<style>
</style>
