<template>
  <CCol v-if="stats != null" sm="6">
    <CRow>
      <CCol md="12">
        <h2 :style="{ marginTop: 0 }">Estadísticas de personaje</h2>
      </CCol>
    </CRow>
    <CRow
      v-for="(stat, index) in stats"
      :key="index"
      :style="{ marginBottom: '0.5em' }"
      :class="stringUtils.getStatColor(index)"
    >
      <div class="col-xs-2 col-md-3 text-center">
        <CIcon
          :name="stringUtils.getStatIcon(index)"
          :style="{ width: '3em', height: '3em' }"
        />
      </div>
      <div class="col-xs-10 col-md-9">
        <div :style="{ fontWeight: 700, textTransform: 'uppercase' }">
          {{ index }}
        </div>
        <div :style="{ fontSize: '0.9em' }">
          <span v-if="stat.value"
            >{{ stringUtils.setTwoNumberDecimal(stat.value) }}% - </span
          >{{ stat.rating }}
        </div>
      </div>
    </CRow>
    <CRow :style="{'padding-top': '150px' }">
      <CCol md="12">
      <button type="button" class="btn btn-outline-warning btn-lg btn-block">Añadir a Mis personajes</button>
      </CCol>
    </CRow>
  </CCol>
</template>
<script>
import stringUtils from "@/app/shared/utils/stringUtils";

export default {
  name: "CharacterStats",
  props: {
    item: { Type: Object, required: true },
  },
  computed: {
    stats: function () {
      return this.formatStats(this.item);
    },
  },
  data() {
    return {
      statsFormatted: {
        intelecto: null,
        agilidad: null,
        aguante: null,
        celeridad: null,
        maestría: null,
        crítico: null,
        versatilidad: null,
      },
      stringUtils: stringUtils,
    };
  },
  methods: {
    formatStats(item) {
      if (item) {
      this.statsFormatted = {
        intelecto: { rating: item.intellect.effective },
        agilidad: { rating: item.agility.effective },
        aguante: { rating: item.stamina.effective },
        celeridad: item.spell_haste,
        crítico: item.spell_crit,
        versatilidad: {
          rating: item.versatility,
          value: item.versatility_damage_done_bonus,
        },
      };
      return this.statsFormatted;
      }
      return null;
    },
  },
};
</script>