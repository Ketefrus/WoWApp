<template>
  <div class="player-details-talents">
    <h3>Talentos</h3>
    <div class="talent-info">
      <div v-for="(item, index) in selectedTalents" 
        :key="index"
        :style="{marginBottom: '0.8em', fontSize: '1.3em'}"
        class='talent-info-row'
      >
        <div class='talent-level'>{{rows[index]}}</div>
        <div class='talent-icon'>
          <a :href="TooltipProviderWowhead.spell(item.spell_tooltip.spell.id)">
            <img v-if="item" :src="item.media.value" :style="{width: '2em', height: '2em' }"/>
          </a>
        </div>
        <div class='talent-name'>
          <span>{{item.talent.name.es_ES}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TooltipProviderWowhead from '@/app/global/Interface/TooltipProviderWowhead';
import { fetchTooltip, fetchIcon } from '@/app/shared/services/wowhead-service';
import { fetchOneSpell } from '@/app/shared/services/spell-service';

export default {
  name: 'CharacterTalents',
  props: {
    talents: { type: Array, default(){return[]}, required: true }
  },
  computed: {
    selectedTalents: function () {
      if (this.talents)
      return [...this.talents];
      
      return null;
    }
  },

  data() {
    return {
      talentsFormatted: [],
      rows: [15, 25, 30, 35, 40, 45, 50],
      TooltipProviderWowhead : TooltipProviderWowhead,
    }
  },

  methods: {
    check(talent) {
      console.log(talent.media.value);
    }
  }
}
</script>