<script setup>
    import { ref } from 'vue';
    const senderValue = ref("");
    const senderLoading = ref(false);

    function handleSubmit(value) {
        console.log(value);
    }

    function handleCancel() {
        senderLoading.value = false;
        ElMessage.info(`取消发送`);
    }
</script>

<template>
  <!-- <div style="display: flex; flex-direction: column; gap: 12px"> -->
    <Sender placeholder="有什么可以帮你的呢？" 
        v-model="senderValue"

        :loading="senderLoading"
        clearable
        @submit="handleSubmit"
        @cancel="handleCancel"
    />
  <!-- </div> -->
</template>
