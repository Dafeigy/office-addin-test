<template>
  <div class="flex w-full my-2 items-center justify-center">
    <el-card>
      <div class="flex items-center">
        <el-button><i class="fas fa-angle-double-left" /></el-button>
        <p class="text-xl font-bold px-2">主要问题</p>
      </div>
      <div class="status bg-red-400 w-[100%] h-1 mt-2"></div>
      <p class="mt-2">生效条款明确，但未涉及需方或业主的主动权。</p>
      <template #footer>
        <p class="text-sm text-gray-500">
          依据：生效条款是否明确？合同生效主动权是否掌握在需方手中？
        </p>
      </template>
    </el-card>
  </div>
</template>
