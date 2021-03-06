<template>
  <transition
    enter-class="bg-layer-leave"
    leave-to-class="bg-layer-leave"
    enter-active-class="transition-colors duration-200 ease-out"
    leave-active-class="transition-colors duration-200 ease-in"
    @before-enter="onBeforeEnter"
    @after-leave="onAfterLeave"
  >
    <div v-show="visible" class="bg-layer-enter flex flex-col" @click.self="state.modal = null">
      <div class="md:mx-auto mt-auto md:mb-auto max-h-2/3 px-4 md:px-5 pb-4 md:pb-5 overflow-auto flex flex-col">
        <transition
          enter-class="transform-leave opacity-0"
          leave-to-class="transform-leave opacity-0"
          enter-active-class="transition duration-200 ease-out"
          leave-active-class="transition duration-200 ease-in"
        >
          <component :is="modal" />
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'

  import {getScrollbarWidth} from '@/common/utils'

  export const state = Vue.observable({
    modal: null,
  })
  state.setModal = (component, data = {}) => {
    state.modal = {
      ...component,
      data () {
        return data
      },
    }
  }

  export default {
    name: 'ModalLayer',

    data () {
      return {
        visible: false,
        modal: null,
      }
    },

    computed: {
      state: () => state,
    },

    watch: {
      async 'state.modal' (val) {
        if (val) {
          this.modal = val
          await this.$nextTick()
          this.visible = true
        } else {
          this.visible = false
          await this.$nextTick()
          this.modal = null
        }
      },
    },

    methods: {
      onBeforeEnter () {
        if (getScrollbarWidth() > 0) {
          const app = document.getElementById('app')
          const scrollTop = document.documentElement.scrollTop
          app.classList.add('h-screen', 'overflow-auto')
          app.scrollTop = scrollTop
        }
        document.body.classList.add('overflow-hidden')
      },

      onAfterLeave () {
        if (getScrollbarWidth() > 0) {
          const app = document.getElementById('app')
          const scrollTop = app.scrollTop
          app.classList.remove('h-screen', 'overflow-scroll')
          document.documentElement.scrollTop = scrollTop
        }
        document.body.classList.remove('overflow-hidden')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bg-layer-enter {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .bg-layer-leave {
    background-color: rgba(0, 0, 0, 0);
  }

  .transform-leave {
    transform: translateY(40px);

    @screen md {
      transform: scale(0.95);
    }
  }
</style>
