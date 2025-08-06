<script setup >
  import CommentItem from './CommentItem.vue';


</script>

<template>
  <!-- <BubbleList :list="list" max-height="90%" /> -->
   <div id="comments" class="w-full h-[98%] overflow-y-auto p-2 flex flex-col items-center justify-center">
    <!-- TODO -->
     <CommentItem></CommentItem>
     <CommentItem></CommentItem>
     <CommentItem></CommentItem>
     <CommentItem></CommentItem>
     <CommentItem></CommentItem>
   </div>
</template>