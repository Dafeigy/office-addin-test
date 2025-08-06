<script setup>
import CommentItem from "./CommentItem.vue";
import { ref } from "vue";
const model = ref("");
const options = [
  {
    value: "QWen25-72B",
    label: "QWen25-72B",
  },
  {
    value: "QWen3-32B",
    label: "QWen25-32B",
  },
  {
    value: "Deepseek-R1-32B",
    label: "Deepseek-R1-32B",
  },
  {
    value: "Deepseek-R1-671B",
    label: "Deepseek-R1-671B",
  },
];

import originJsonData from '../../targetjson/test.json';
const commentsData = ref([]);
const noPassCount = ref(0);
const warningCount = ref(5);
const dangerCount = ref(15);
const successCount = ref(10);

const startComments = () => {
  commentsData.value = originJsonData.data.records;
  console.log(commentsData.value);
};

const clearComments = () => {
  commentsData.value = [];
}

</script>

<template>
  <!-- NAVBAR   -->
   <div class="flex justify-center flex-col w-full">
    <div class="flex ml-2">
      <el-button @click="clearComments"><i class="fas fa-redo-alt"></i></el-button>
      <p class="font-bold text-2xl ml-2">评审结果:</p>
    </div>
    <div class="ml-2 flex gap-1 mt-2">
      <el-tag type="info">失败: {{ noPassCount }}</el-tag>
      <el-tag type="danger">不通过： {{ dangerCount }}</el-tag>
      <el-tag type="warning">警告： {{ warningCount }}</el-tag>
      <el-tag type="success">通过：{{ successCount }}</el-tag>
    </div>
  </div>

  <!-- Comments Display -->
  <div
    id="comments"
    class="w-full h-[80%] overflow-y-auto p-2 flex flex-col items-center"
  >
    <CommentItem
      v-for="comment in commentsData"
      :key="comment.sort"
      :item="comment"
    />
  </div>

  <!-- Interactions -->
  <div class="flex justify-center h-[10%] w-full px-2 mt-5 items-center">
    <p>模型：</p>
    <el-select v-model="model" placeholder="Select" style="width: 50%">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" class="ml-2" @click="startComments"
      ><i class="fas fa-comments"></i>开始审核</el-button
    >
  </div>
</template>
