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

import originJsonData from "../../targetjson/test.json";
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
  // 清空批注结果
  commentsData.value = [];
};

const parseOriginText = (origintext) => {
  // 处理带特殊字符的原文
  var sentences = origintext.split("\n");
  let longestSentence = "";
  for (let i = 0; i < sentences.length; i++) {
    if (sentences[i].length > longestSentence.length) {
      longestSentence = sentences[i];
    }
  }
  return longestSentence;
};

const searchtext = ref(
  "合同协议书经双方法定代表人（负责人）或其授权代表签字并加盖单位公章或合同专用章；"
);

async function searchText(searchtext) {
  await Word.run(async (context) => {
    // 单个搜索
    // Queue a command to search the document for tabs.
    const searchResults = context.document.body.search(searchtext);

    context.load(searchResults);
    await context.sync();
    const allParagraphs = context.document.body.paragraphs;
    context.load(allParagraphs);

    await context.sync();

    // 遍历搜索结果
    var result = searchResults.items[0];
    var text = result.text;
    console.log(allParagraphs.toJSON());
    // 查找该段落在全文中的索引
    var paragraphIndex = -1;
    for (let i = 0; i < allParagraphs.items.length; i++) {
      if (allParagraphs.items[i].text.includes(text)) {
        var paragraphIndex = i;
        break;
      }
    }
    try {
      // 获取当前选中段落的索引

      // 发送请求到 VSTO 服务
      const response = await fetch("http://localhost:8080/Annotation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ParagraphIndex: paragraphIndex,
          Text: "测试",
          Author: "QWen/Qwen2.5",
        }),
      });

      const result = await response.json();
      if (!result.success) throw new Error("VSTO operation failed");
      console.log("批注添加成功！");
    } catch (error) {
      console.error("批注添加失败:", error);
    }
    await context.sync();
    // 您可以进一步处理这些范围
    // result.ranges[0].font.highlightColor = '#FFFF00'; // 例如高亮显示
  });
}
</script>

<template>
  <!-- NAVBAR   -->
  <div class="flex justify-center flex-col w-full">
    <div class="flex ml-2">
      <el-button @click="searchText(searchtext)"
        ><i class="fas fa-search"></i
      ></el-button>
      <el-button @click="clearComments"
        ><i class="fas fa-redo-alt"></i
      ></el-button>
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
