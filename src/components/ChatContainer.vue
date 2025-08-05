<script setup >


const list = generateFakeItems(5);

function generateFakeItems(count) {
  const messages= [];
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user';
    const placement = role === 'ai' ? 'start' : 'end';
    const key = i + 1;
    const content =
      role === 'ai'
        ? 'Lorem ipsum 客观地由不相关的单词组成，其存在归功于 Marco Tullio Cicerone 和他的 De finibus bonorum et malorum （最高的善和最高的恶） 写于公元前 45 年的某些步骤，这是一部可以追溯到超过2000 年前。这一发现是由理查德麦克林托克发现的，他是弗吉尼亚州汉普顿-悉尼学院的拉丁语教授，他面临着浮躁的复发文本中的黑暗词 consectetur 研究了它的起源，以在上述西塞罗哲学著作的 1.10.32 和 1.10.33 节中识别它们。取自的词因此， Definibus 中包含的对话之一是世界上最著名的无意义文本的片段。这一发现使 Lorem ipsum 变得更加重要，自 500 年以来，它一直处于浪潮的顶峰，根据理查德麦克林托克教授的说法，当时它的使用在当时的打印机中传播开来。当然，我们知道要让大多数人知道是 60 年代的宣传，即可转移的 Letraset 字符表：透明的粘合纸，上面印有 Lorem ipsum 文本 可轻松转移到编辑产品上在计算机出现之前。'
        : `为什么一点点的配送费那么贵`;
    const loading = false;
    const shape = 'corner';
    const variant = role === 'ai' ? 'filled' : 'outlined';
    const isMarkdown = false;
    const typing = role === 'ai' ? i === count - 1 : false;
    const avatar =
      role === 'ai'
        ? 'https://avatars.githubusercontent.com/u/55502809?v=4' 
        : 'https://avatars.githubusercontent.com/u/55502809?v=4';

    messages.push({
      key, // 唯一标识
      role, // user | ai 自行更据模型定义
      placement, // start | end 气泡位置
      content, // 消息内容 流式接受的时候，只需要改这个值即可
      loading, // 当前气泡的加载状态
      shape, // 气泡的形状
      variant, // 气泡的样式
      isMarkdown, // 是否渲染为 markdown
      typing, // 是否开启打字器效果 该属性不会和流式接受冲突
      isFog: role === 'ai', // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
      avatar,
      avatarSize: '24px', // 头像占位大小
      avatarGap: '12px' // 头像与气泡之间的距离
    });
  }
  return messages;
}
</script>

<template>
  <BubbleList :list="list" max-height="90%" />
</template>