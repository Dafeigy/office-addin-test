<script setup>
import ChatSender from './components/ChatSender.vue';
import ChatContainer from './components/ChatContainer.vue';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div id="container" class="flex flex-col items-center justify-center">
    <div id="header" class="h-[5%] py-8 w-full ">
      <NavBar />
    </div>
    <div id="main" class="h-[80%] w-full mt-2 flex-col flex items-center justify-center">
      <ChatContainer />
      <!-- <button class="mt-2 group relative bg-slate-900 h-16 w-full border-2 border-teal-600 text-white text-base font-bold rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-emerald-400 hover:text-emerald-300 p-3 text-left before:absolute before:w-10 before:h-10 before:content[''] before:right-2 before:top-2 before:z-10 before:bg-indigo-500 before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-16 after:h-16 after:content[''] after:bg-teal-400 after:right-6 after:top-4 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-10 hover:before:-bottom-4 hover:before:blur hover:after:-right-6 hover:after:scale-110" id="testbutton" @click="gentext">生成批注</button> -->
    </div>
    <div id="userinput" class="w-full h-[15%] mb-2">
      <ChatSender />
    </div>
  </div>
</template>
