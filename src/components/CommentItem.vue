<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex w-full my-2 items-center justify-center bg-indigo-50">
    <el-card class="w-full">
      <div class="flex items-center w-full">
        <el-button><i class="fas fa-angle-double-left" /></el-button>
        <p class="text-xl font-bold px-2">
          {{ item.status === "pass" ? ("通过") : (item.status === "warning" ?"提示":"警告") }}
        </p>
      </div>
      <div class="status bg-red-400 h-1 mt-2" :class="item.status"></div>
      <p class="mt-2">{{ item.status === "pass" ? ("评审通过") : (item.status === "warning" ?"评审提示":"评审警告") }}：{{ item.result }}</p>
      <template #footer>
        <p class="text-sm text-gray-500">
        评审规则：{{ item.rule }}
        </p>
      </template>
    </el-card>
  </div>
</template>
