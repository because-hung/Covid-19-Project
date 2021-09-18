<template>
<div>
    <div class="topSection">
                <div class="topbanner pt-2 bg-gray-300 flex justify-between sm:justify-start pb-2 sm:pb-0">
                    <div class="colorball flex items-center">
                        <div
                            class="ball bg-red-400 rounded-full w-6 h-6 ml-2"
                        ></div>
                        <div
                            class="ball bg-yellow-300 rounded-full w-6 h-6 ml-2"
                        ></div>
                        <div
                            class="ball bg-green-400 rounded-full w-6 h-6 ml-2"
                        ></div>
                    </div>
                    <div class="tabs  flex  ml-4 mr-4 sm:mr-0 text-2xl hidden sm:inline-flex">
                        <nuxt-link to="./"><button class="bg-white  py-4 px-6 ld:px-16 sm:rounded-t-xl  font-bold border-white">
                            全球疫情狀況
                        </button></nuxt-link>
                        <nuxt-link to="./taiwan"><button class="bg-white  py-4 px-6 ld:px-16 mt-3 sm:mt-0 sm:rounded-t-xl sm:mx-3  font-bold border-white">
                            台灣縣市狀況
                        </button></nuxt-link>
                        <nuxt-link to="./vaccine"><button class="bg-white  py-4 px-6 ld:px-16 mt-3 sm:mt-0 sm:rounded-t-xl mr-3 font-bold border-white">
                            疫苗施打狀況
                        </button></nuxt-link>
                     
                        
                    </div>
                       <div class="hamMenu block sm:hidden mr-3" @click="openMenu(toggle)">
                         <fa
                        :icon="['fas', 'bars']"
                        class=" text-black text-3xl"
                    />
                    </div>
                </div>
                <div
                    class="arrow flex justify-around items-center py-2 bg-white"
                >
                    <fa
                        :icon="['fas', 'arrow-left']"
                        class="text-gray-400 text-xl md:text-2xl ml-2 sm:ml-0"
                    />
                    <fa
                        :icon="['fas', 'arrow-right']"
                        class="text-gray-400 text-xl md:text-2xl ml-2 sm:ml-0"
                    />
                    <div
                        class="bg-gray-300 w-11/12 rounded-full py-4 mx-2 sm:mx-0"
                    >
                    </div>
                </div>
                <hr />
            </div>
</div>
</template>
<script>
export default {
    data () {
        return{
 toggle: 1
        }
       

    },
    methods:{
        openMenu (id) {
            var menu =  document.querySelector('.tabs');
            var ball = document.querySelector('.colorball');
            var bground =  document.querySelector('.topbanner')
            if(id==1){
   menu.style.display="block";
    bground.style.background="none";
      ball.style.display="none";
            this.toggle = 0
            }else{
                  menu.style.display="none";
                     ball.style.display="block";
                       ball.style.display="flex";
                         bground.style.background="rgba(209, 213, 219, var(--tw-bg-opacity))";
                    
            this.toggle = 1
            }
         

        }
    }
}
</script>
<style>
@media max {
    
}

</style>