<template>
  <div class="management">
    <sidebar></sidebar>
    <router-view class="bg-color-gray right-area"></router-view>
  </div>
</template>

<script>
import sidebar from './sidebar';
export default {
  name: 'management',
  components: {
    sidebar
  }
}
</script>

<style lang="scss">
  .management{
    display: flex;
    justify-content: flex-start;
    height: 100%;
    .right-area{
      padding: 30px;
      width:100%;
      height: 100%;
    }
  }
  
</style>
