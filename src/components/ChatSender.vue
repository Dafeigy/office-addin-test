<script setup>
import { ref } from "vue";

const value = ref("");

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

function searchText(){

}
function startComments(){

}
</script>

<template>
  <div class="flex justify-center h-full w-full px-2 mt-5">
    <p>模型：</p>
    <el-select v-model="value" placeholder="Select" style="width: 50%">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button 
    type="primary" 
    class="ml-2 "
    @click="startComments"
      ><i class="fas fa-comments"></i
    >开始审核</el-button>
  </div>
</template>
