<script setup lang="ts">
import StackPanel from "@/components/StackPanel.vue";

defineProps({
  title: {
    type: String,
    default: "PostType"
  }
})
</script>

<template>
  <stack-panel class="single-line" orientation="horizontal">
    <stack-panel gap="6px" class="subtitle single-line" orientation="horizontal">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" style="transform: rotate(180deg) translate(0px, 0px);width: 1.5em; height: 1.5em">
        <g fill="none" fill-rule="evenodd">
          <path
            d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z">
          </path>
          <path fill="currentColor"
            d="M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM9 3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z">
          </path>
        </g>
      </svg>
      <h3 class="unline-height">{{ title }}</h3>
    </stack-panel>

    <stack-panel style="width: auto" class="subtitle link-block single-line" orientation="horizontal" gap="6px">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" style="transform: rotate(180deg) translate(0px, 0px); width: 1.5em; height: 1.5em">
        <path fill="currentColor"
          d="M9 20q-.475 0-.9-.213t-.7-.587l-4.5-6q-.4-.525-.4-1.2t.4-1.2l4.5-6q.275-.375.7-.587T9 4h11q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm1-7q.425 0 .713-.288T11 12t-.288-.712T10 11t-.712.288T9 12t.288.713T10 13m3.5 0q.425 0 .713-.288T14.5 12t-.288-.712T13.5 11t-.712.288T12.5 12t.288.713t.712.287m3.5 0q.425 0 .713-.288T18 12t-.288-.712T17 11t-.712.288T16 12t.288.713T17 13">
        </path>
      </svg>
      <h3 class="unline-height">More</h3>
    </stack-panel>
  </stack-panel>
</template>
