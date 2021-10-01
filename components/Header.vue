<template>
  <div>
    <div class="topSection">
      <div
        class="
          topbanner
          bg-gray-300
          flex
          justify-between
          sm:justify-start        
          sm:pb-0
        "
       
      >
        <div class="colorball flex items-center"   >
          <div class="ball bg-red-400 rounded-full w-6 h-6 ml-2" v-if="!open"></div>
          <div class="ball bg-yellow-300 rounded-full w-6 h-6 ml-2" v-if="!open"></div>
          <div class="ball bg-green-400 rounded-full w-6 h-6 ml-2" v-if="!open"></div>
        </div>

        <!--pad and computer screen-->
        <div class="tabs flex ml-4 mr-4 sm:mr-0 text-2xl hidden sm:inline-flex">
          <nuxt-link to="./"
            ><button
              class="
                bg-white
                py-4
                px-6
                ld:px-16
                sm:rounded-t-xl
                font-bold
                border-white
              "
            >
              全球疫情狀況
            </button></nuxt-link
          >
          <nuxt-link to="./taiwan"
            ><button
              class="
                bg-white
                py-4
                px-6
                ld:px-16
                mt-3
                sm:mt-0 sm:rounded-t-xl sm:mx-3
                font-bold
                border-white
              "
            >
              台灣縣市狀況
            </button></nuxt-link
          >
          <nuxt-link to="./vaccine"
            ><button
              class="
                bg-white
                py-4
                px-6
                ld:px-16
                mt-3
                sm:mt-0 sm:rounded-t-xl
                mr-3
                font-bold
                border-white
              "
            >
              疫苗施打狀況
            </button></nuxt-link
          >
        </div>
        <!--mobile screen-->
        <div class="mobileMenu w-full pr-3 flex flex-col items-end mt-2" :class="{'active':open}">
        <div class="hambutton block sm:hidden pt-2" >
             <fa
          :icon="['fas', 'bars']"
          class="text-black text-3xl"
          @click="openMenu"
          :class="{'buttonActive':open}"
        />

          </div>
       
        <div class="hamMenu py-2">
          
          <div
            class="mobile-link flex flex-col justify-center items-center"
            v-if="open"
          >
            <nuxt-link to="./"
              ><button
                class=" py-6 my-2 px-2 font-bold border-white border-2 rounded-lg blur"
                @click="open = false"
              >
                全球疫情狀況
              </button></nuxt-link
            >
            <nuxt-link to="./taiwan"
              ><button
                class=" py-6 my-2 px-2 font-bold border-white border-2 rounded-lg blur"
                @click="open = false"
              >
                台灣縣市狀況
              </button></nuxt-link
            >
            <nuxt-link to="./vaccine"
              ><button
                class=" py-6 my-2 px-2 font-bold border-white border-2 rounded-lg blur"
                @click="open = false"
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
      toggle: 1,
      open: false,
    }
  },
  methods: {
    openMenu() {
      this.open = !this.open

      //             let menu =  document.querySelector('.tabs');
      //             let ball = document.querySelector('.colorball');
      //             let bground =  document.querySelector('.topbanner')
      //             if(id==1){
      //    menu.style.display="block";
      //     bground.style.background="none";
      //       ball.style.display="none";
      //             this.toggle = 0
      //             }else{
      //                   menu.style.display="none";
      //                      ball.style.display="block";
      //                        ball.style.display="flex";
      //                          bground.style.background="rgba(209, 213, 219, var(--tw-bg-opacity))";

      //             this.toggle = 1
      //             }
    },
    togglemenu() {
      let screenWidth = screen.width
      console.log("screenWidth:", screenWidth)
      if (screenWidth < 415) {
        let menu = document.querySelector(".tabs")
        let ball = document.querySelector(".colorball")
        let bground = document.querySelector(".topbanner")
        menu.style.display = "none"
        ball.style.display = "block"
        ball.style.display = "flex"
        bground.style.background = "rgba(209, 213, 219, var(--tw-bg-opacity))"
      }
    },
  },
}
</script>
<style lang="scss">
 
  .active{
     background-image: url(../assets/country05.jpg);

  }
  .blur{
  backdrop-filter: blur(15px);
  }
  .buttonActive{
      color: white;
  }



</style>
