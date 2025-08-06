<script setup>
import { ref } from "vue";

async function searchText(keytext) {
  // keytext = '你妈'
  await Word.run(async (context) => {
    // Queue a command to search the document for tabs.
    const searchResults = context.document.body.search(keytext, {
      ignorePunct: true,
    });

    // Queue a command to load the font property values.
    searchResults.load("font");

    // Synchronize the document state.
    await context.sync();
    console.log("Found count: " + searchResults.items.length);

    // Queue a set of commands to change the font for each found item.
    for (let i = 0; i < searchResults.items.length; i++) {
      searchResults.items[i].font.color = "purple";
      searchResults.items[i].font.highlightColor = "pink";
      searchResults.items[i].font.bold = true;
    }

    // Synchronize the document state.
    await context.sync();
  });
}


</script>
<template>
  
</template>
