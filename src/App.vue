<script setup>
import ChatSender from './components/ChatSender.vue';
import ChatContainer from './components/ChatContainer.vue';
import Comments from './components/Comments.vue';
import { Comment } from 'vue';
</script>

<template>
  <div id="container">
    <div id="header" style="height: 20%;">
      <Comments />
      <!-- <TheWelcome/> -->
    </div>
    <div id="main" style="height: 70%; width: 100%;">
      <ChatContainer />
    </div>
    <div id="userinput" style="width: 100%; height: 10%;">
      <ChatSender />
    </div>
  </div>
</template>
