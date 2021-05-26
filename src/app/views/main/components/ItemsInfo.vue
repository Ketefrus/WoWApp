<template>
    <a :href="TooltipProviderWowhead.item(item.item.id)">
      <img :src="item.media.value" :class="`gear-icon icon game ${stringUtils.getItemColor(item.quality.type)}`" />
      </a>
</template>

<script>
import TooltipProviderWowhead from '@/app/global/Interface/TooltipProviderWowhead';
import stringUtils from "@/app/shared/utils/stringUtils";

export default {
  name: "ItemsInfo",
  props: {
    item: { type: Object, required: true },
  },
  computed: {
    // equipment: function () {
    //   this.items.map((p) => {
    //     p.gearSlot = this.checkGearSlot(p);
    //     [...this.items];
    //   });

    //   return [...this.items];
    // },
  },
  data() {
    return {
      stringUtils: stringUtils,
      loading: true,
      TooltipProviderWowhead : TooltipProviderWowhead,
    };
  },
  methods: {
        check(talent) {
      console.log(talent);
    },
    checkGearSlot(item) {
      // TODO: Make a better logic for the grid system
      const slot = item.slot.type;

      let gearSlot;
      if (slot === "HEAD") gearSlot = 0;
      else if (slot === "NECK") gearSlot = 1;
      else if (slot === "SHOULDER") gearSlot = 2;
      else if (slot === "BACK") gearSlot = 14;
      else if (slot === "CHEST") gearSlot = 4;
      else if (slot === "SHIRT") gearSlot = 3;
      else if (slot === "TABARD") gearSlot = 17;
      else if (slot === "WRIST") gearSlot = 8;
      else if (slot === "HANDS") gearSlot = 9;
      else if (slot === "WAIST") gearSlot = 5;
      else if (slot === "LEGS") gearSlot = 6;
      else if (slot === "FEET") gearSlot = 7;
      else if (slot === "FINGER_1") gearSlot = 10;
      else if (slot === "FINGER_2") gearSlot = 11;
      else if (slot === "TRINKET_1") gearSlot = 12;
      else if (slot === "TRINKET_2") gearSlot = 13;
      else if (slot === "MAIN_HAND") gearSlot = 15;
      else if (slot === "OFF_HAND") gearSlot = 16;

      return gearSlot;
    },
  },
};
</script>
<style>
</style>