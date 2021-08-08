<template>
<div>
    <div class="topSection">
                <div class="topbanner pt-2 bg-gray-300 flex">
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
                    <div class="tabs ml-4 text-2xl flex">
                        <nuxt-link to="./"><button class="bg-white py-4 px-16 rounded-t-xl  font-bold border-white">
                            全球疫情狀況
                        </button></nuxt-link>
                        <nuxt-link to="./taiwan"><button class="bg-white py-4 px-16 rounded-t-xl mx-2  font-bold border-white">
                            台灣各地區狀況
                        </button></nuxt-link>
                        <nuxt-link to="./vaccine"><button class="bg-white py-4 px-16 rounded-t-xl  font-bold border-white">
                            疫苗施打狀況
                        </button></nuxt-link>
                        
                    </div>
                    <div class="cross">
                         <fa
                        :icon="['fas', 'times']"
                        class="text-white text-3xl"
                    />
                    </div>
                </div>
                <div
                    class="arrow flex justify-around items-center py-2 bg-white"
                >
                    <fa
                        :icon="['fas', 'arrow-left']"
                        class="text-gray-400 text-2xl"
                    />
                    <fa
                        :icon="['fas', 'arrow-right']"
                        class="text-gray-400 text-2xl"
                    />
                    <div
                        class="bg-gray-300 w-11/12 rounded-full py-4"
                    >
                    </div>
                </div>
                <hr />
            </div>
</div>
</template>
<style>
.cross{
    position: absolute;
    top: 30px;
    right: 200px;
}
</style>