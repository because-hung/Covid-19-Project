<template>
  <div>
    <div class="topSection">
      <div
        class="
          topBanner
          bg-gray-300
          flex
          justify-between
          sm:justify-start sm:pb-0
        "
      >
        <div class="colorBall flex items-center">
          <!-- 三個球 紅 黃 綠 -->
          <div
            class="ball bg-red-400 rounded-full w-6 h-6 ml-2"
            v-if="!open"
          ></div>
          <div
            class="ball bg-yellow-300 rounded-full w-6 h-6 ml-2"
            v-if="!open"
          ></div>
          <div
            class="ball bg-green-400 rounded-full w-6 h-6 ml-2"
            v-if="!open"
          ></div>
        </div>

        <!-- pc layout 電腦版型 -->
        <div class="tabs mt-3 ml-4 mr-4 sm:mr-0 text-2xl hidden sm:flex">
          <!-- 連結按鈕 -->
          <nuxt-link to="./"
            ><button
              class="
                pcButton
                bg-white
                py-4
                px-10
                ld:px-16
                sm:rounded-t-xl
                font-bold
                border-white
                hover:bg-gray-300 hover:text-white
              "
            >
              全球疫情狀況
            </button></nuxt-link
          >
          <nuxt-link to="./taiwan"
            ><button
              class="
                pcButton
                bg-white
                py-4
                px-10
                ld:px-16
                mt-3
                sm:mt-0 sm:rounded-t-xl sm:mx-3
                font-bold
                border-white
                hover:bg-gray-300 hover:text-white
              "
            >
              台灣縣市狀況
            </button></nuxt-link
          >
          <nuxt-link to="./vaccine"
            ><button
              class="
                pcButton
                bg-white
                py-4
                px-10
                ld:px-16
                mt-3
                sm:mt-0 sm:rounded-t-xl
                mr-3
                font-bold
                border-white
                hover:bg-gray-300 hover:text-white
              "
            >
              疫苗施打狀況
            </button></nuxt-link
          >
        </div>
        <!-- mobile layout 手機版型  漢堡選單 -->
        <div
          class="
            mobileMenu
            w-full
            pr-3
            flex flex-col
            items-end
            mt-2
            block
            sm:hidden
          "
          :class="{ active: open }"
        >
          <div class="hamButton pt-2">
            <fa
              :icon="['fas', 'bars']"
              class="text-black text-3xl"
              @click="openMenu"
              :class="{ buttonActive: open }"
            />
          </div>

          <div class="hamMenu py-2 w-full">
            <div
              class="mobile-link flex flex-col justify-center items-center"
              v-if="open"
            >
              <nuxt-link to="./"
                ><button
                  class="
                    py-6
                    my-3
                    px-16
                    font-bold
                    border-white border-2
                    rounded-lg
                    blur
                  "
                  @click="openMenu()"
                >
                  全球疫情狀況
                </button></nuxt-link
              >
              <nuxt-link to="./taiwan"
                ><button
                  class="
                    py-6
                    my-3
                    px-16
                    font-bold
                    border-white border-2
                    rounded-lg
                    blur
                  "
                  @click="openMenu()"
                >
                  台灣縣市狀況
                </button></nuxt-link
              >
              <nuxt-link to="./vaccine"
                ><button
                  class="
                    py-6
                    my-3
                    px-16
                    font-bold
                    border-white border-2
                    rounded-lg
                    blur
                  "
                  @click="openMenu()"
                >
                  疫苗施打狀況
                </button></nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="arrow flex justify-around items-center py-2 bg-white">
        <fa
          :icon="['fas', 'arrow-left']"
          class="text-gray-400 text-xl md:text-2xl ml-2 sm:ml-0"
        />
        <fa
          :icon="['fas', 'arrow-right']"
          class="text-gray-400 text-xl md:text-2xl ml-2 sm:ml-0"
        />
        <div class="bg-gray-300 w-11/12 rounded-full py-4 mx-2 sm:mx-0"></div>
      </div>
      <hr />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
    }
  },
  methods: {
    openMenu() {
      this.open = !this.open // 控制漢堡選單開關
    },
  },
}
</script>
<style lang="scss">
.active {
  background-image: url(../assets/hamMenu.jpg);
}
.blur {
  backdrop-filter: blur(15px); // 毛玻璃特效
}
.buttonActive {
  color: white;
}
</style>
