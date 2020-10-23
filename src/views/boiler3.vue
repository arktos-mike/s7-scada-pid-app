<template>
  <v-container fluid class="mx-auto pa-0">
    <div class="primary hidden-sm-and-down">
      <h2 class="ml-2">Котёл ДЕ-10-14 ст.№1</h2>
    </div>
    <v-tabs fixed-tabs icons-and-text background-color="blue darken-4" dark>
      <v-tab>
        РЕГУЛЯТОР НАГРУЗКИ
        <v-icon>mdi-square-wave</v-icon>
      </v-tab>
      <v-tab>
        РЕГУЛЯТОР ВОЗДУХА
        <v-icon>mdi-sine-wave</v-icon>
      </v-tab>
      <v-tab>
        РЕГУЛЯТОР ВОЗДУХА
        <v-icon>mdi-square-wave</v-icon>
      </v-tab>
      <v-tab>
        РЕГУЛЯТОР РАЗРЕЖЕНИЯ
        <v-icon>mdi-sine-wave</v-icon>
      </v-tab>
      <v-tab>
        РЕГУЛЯТОР РАЗРЕЖЕНИЯ
        <v-icon>mdi-square-wave</v-icon>
      </v-tab>
      <v-tab>
        РЕГУЛЯТОР УРОВНЯ
        <v-icon>mdi-square-wave</v-icon>
      </v-tab>
      <v-tab-item>
        <TEXiPID
          ref="iScomp"
          :plc="plc"
          :chartTitle="iS.chartTitle"
          :variables="iS.variables"
          :params="iS.params"
          @update:plc="plc = $event"
        />
      </v-tab-item>
      <v-tab-item>
        <TEXaPID
          ref="aAcomp"
          :plc="plc"
          :chartTitle="aA.chartTitle"
          :variables="aA.variables"
          :params="aA.params"
          @update:plc="plc = $event"
        />
      </v-tab-item>
      <v-tab-item>
        <TEXiPID
          ref="iAcomp"
          :plc="plc"
          :chartTitle="iA.chartTitle"
          :variables="iA.variables"
          :params="iA.params"
          @update:plc="plc = $event"
        />
      </v-tab-item>
      <v-tab-item>
        <TEXaPID
          ref="aFcomp"
          :plc="plc"
          :chartTitle="aF.chartTitle"
          :variables="aF.variables"
          :params="aF.params"
          @update:plc="plc = $event"
        />
      </v-tab-item>
      <v-tab-item>
        <TEXiPID
          ref="iFcomp"
          :plc="plc"
          :chartTitle="iF.chartTitle"
          :variables="iF.variables"
          :params="iF.params"
          @update:plc="plc = $event"
        />
      </v-tab-item>
      <v-tab-item>
        <TEXiPID
          ref="iLcomp"
          :plc="plc"
          :chartTitle="iL.chartTitle"
          :variables="iL.variables"
          :params="iL.params"
          @update:plc="plc = $event"
        />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import TEXiPID from "@/components/TEXiPID.vue";
import TEXaPID from "@/components/TEXaPID.vue";
export default {
  components: {
    TEXiPID,
    TEXaPID
  },
  name: "boiler3",
  computed: {},
  methods: {
    pauseAll() {
      if (typeof this.$refs.iAcomp != "undefined") {
        this.$refs.iAcomp.cancelAutoUpdate();
        this.$refs.iAcomp.updateStart = false;
      }
      if (typeof this.$refs.aAcomp != "undefined") {
        this.$refs.aAcomp.cancelAutoUpdate();
        this.$refs.aAcomp.updateStart = false;
      }
      if (typeof this.$refs.iFcomp != "undefined") {
        this.$refs.iFcomp.cancelAutoUpdate();
        this.$refs.iFcomp.updateStart = false;
      }
      if (typeof this.$refs.aFcomp != "undefined") {
        this.$refs.aFcomp.cancelAutoUpdate();
        this.$refs.aFcomp.updateStart = false;
      }
      if (typeof this.$refs.iScomp != "undefined") {
        this.$refs.iScomp.cancelAutoUpdate();
        this.$refs.iScomp.updateStart = false;
      }
      if (typeof this.$refs.iLcomp != "undefined") {
        this.$refs.iLcomp.cancelAutoUpdate();
        this.$refs.iLcomp.updateStart = false;
      }
    }
  },
  data: () => {
    return {
      plc: "192.168.0.202",
      aA: {
        chartTitle: "Регулятор воздуха (аналоговый)",
        variables: {
          PV: "DB11,REAL14",
          SP: "DB186,REAL6",
          RO: "DB25,REAL14",
          SR: "DB149,REAL0",
          MODE: "DB238,X0.0",
          MU: "DB238,X0.1",
          MD: "DB238,X0.2",
          MS: "DB238,REAL2",
          KP: "DB238,REAL20",
          TI: "DB238,DWORD24",
          TD: "DB238,DWORD28",
          DB: "DB238,REAL16"
        },
        params: [
          {
            name: "Регулируемая величина",
            tag: "PV",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Уставка",
            tag: "SP",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Зона нечувствительности",
            tag: "DB",
            ro: false,
            eng: "Па",
            type: "number",
            step: 0.1,
            dec: 1
          },
          {
            name: "Производительность РО",
            tag: "RO",
            ro: true,
            eng: "Гц",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Задание РО",
            tag: "SR",
            ro: true,
            eng: "Гц",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Ручное задание РО",
            tag: "MS",
            ro: false,
            eng: "Гц",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Коэффициент пропорциональности",
            tag: "KP",
            ro: false,
            eng: "",
            type: "number",
            step: 0.001,
            dec: 4
          },
          {
            name: "Постоянная времени интегрирования",
            tag: "TI",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Постоянная времени дифференцирования",
            tag: "TD",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          }
        ]
      },
      aF: {
        chartTitle: "Регулятор разрежения (аналоговый)",
        variables: {
          PV: "DB8,REAL14",
          SP: "DB186,REAL10",
          RO: "DB26,REAL14",
          SR: "DB150,REAL0",
          MODE: "DB239,X0.0",
          MU: "DB239,X0.1",
          MD: "DB239,X0.2",
          MS: "DB239,REAL2",
          KP: "DB239,REAL20",
          TI: "DB239,DWORD24",
          TD: "DB239,DWORD28",
          DB: "DB239,REAL16"
        },
        params: [
          {
            name: "Регулируемая величина",
            tag: "PV",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Уставка",
            tag: "SP",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Зона нечувствительности",
            tag: "DB",
            ro: false,
            eng: "Па",
            type: "number",
            step: 0.1,
            dec: 1
          },
          {
            name: "Производительность РО",
            tag: "RO",
            ro: true,
            eng: "Гц",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Задание РО",
            tag: "SR",
            ro: true,
            eng: "Гц",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Ручное задание РО",
            tag: "MS",
            ro: false,
            eng: "Гц",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Коэффициент пропорциональности",
            tag: "KP",
            ro: false,
            eng: "",
            type: "number",
            step: 0.001,
            dec: 4
          },
          {
            name: "Постоянная времени интегрирования",
            tag: "TI",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Постоянная времени дифференцирования",
            tag: "TD",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          }
        ]
      },
      iA: {
        chartTitle: "Регулятор воздуха (импульсный)",
        variables: {
          PV: "DB11,REAL14",
          SP: "DB186,REAL6",
          PU: "DB116,X0.0",
          PD: "DB117,X0.0",
          RO: "DB14,REAL14",
          MODE: "DB236,X0.0",
          MU: "DB236,X0.1",
          MD: "DB236,X0.2",
          KP: "DB236,REAL10",
          TI: "DB236,DWORD14",
          TD: "DB236,DWORD18",
          DB: "DB236,REAL6",
          MIN: "DB236,DWORD26",
          FMT: "DB236,DWORD22",
          GAP: "DB236,DINT30"
        },
        params: [
          {
            name: "Регулируемая величина",
            tag: "PV",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Уставка",
            tag: "SP",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Зона нечувствительности",
            tag: "DB",
            ro: false,
            eng: "Па",
            type: "number",
            step: 0.1,
            dec: 1
          },
          {
            name: 'Импульс "Больше"',
            tag: "PU",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: 'Импульс "Меньше"',
            tag: "PD",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: "Положение РО",
            tag: "RO",
            ro: true,
            eng: "%",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Коэффициент пропорциональности",
            tag: "KP",
            ro: false,
            eng: "",
            type: "number",
            step: 0.001,
            dec: 4
          },
          {
            name: "Постоянная времени интегрирования",
            tag: "TI",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Постоянная времени дифференцирования",
            tag: "TD",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Минимальная длительность импульса",
            tag: "MIN",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          },
          {
            name: "Время хода механизма",
            tag: "FMT",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Время люфта",
            tag: "GAP",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          }
        ]
      },
      iF: {
        chartTitle: "Регулятор разрежения (импульсный)",
        variables: {
          PV: "DB8,REAL14",
          SP: "DB186,REAL10",
          PU: "DB118,X0.0",
          PD: "DB119,X0.0",
          RO: "DB15,REAL14",
          MODE: "DB237,X0.0",
          MU: "DB237,X0.1",
          MD: "DB237,X0.2",
          KP: "DB237,REAL10",
          TI: "DB237,DWORD14",
          TD: "DB237,DWORD18",
          DB: "DB237,REAL6",
          MIN: "DB237,DWORD26",
          FMT: "DB237,DWORD22",
          GAP: "DB237,DINT30"
        },
        params: [
          {
            name: "Регулируемая величина",
            tag: "PV",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Уставка",
            tag: "SP",
            ro: true,
            eng: "Па",
            type: "number",
            step: 0,
            dec: 1
          },
          {
            name: "Зона нечувствительности",
            tag: "DB",
            ro: false,
            eng: "Па",
            type: "number",
            step: 0.1,
            dec: 1
          },
          {
            name: 'Импульс "Больше"',
            tag: "PU",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: 'Импульс "Меньше"',
            tag: "PD",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: "Положение РО",
            tag: "RO",
            ro: true,
            eng: "%",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Коэффициент пропорциональности",
            tag: "KP",
            ro: false,
            eng: "",
            type: "number",
            step: 0.001,
            dec: 4
          },
          {
            name: "Постоянная времени интегрирования",
            tag: "TI",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Постоянная времени дифференцирования",
            tag: "TD",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Минимальная длительность импульса",
            tag: "MIN",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          },
          {
            name: "Время хода механизма",
            tag: "FMT",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Время люфта",
            tag: "GAP",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          }
        ]
      },
      iL: {
        chartTitle: "Регулятор уровня (импульсный)",
        variables: {
          PV: "DB20,REAL14",
          SP: "DB221,REAL22",
          PU: "DB120,X0.0",
          PD: "DB121,X0.0",
          RO: "DB12,REAL14",
          MODE: "DB225,X0.0",
          MU: "DB225,X0.1",
          MD: "DB225,X0.2",
          KP: "DB225,REAL10",
          TI: "DB225,DWORD14",
          TD: "DB225,DWORD18",
          DB: "DB225,REAL6",
          MIN: "DB225,DWORD26",
          FMT: "DB225,DWORD22",
          GAP: "DB225,DINT30"
        },
        params: [
          {
            name: "Регулируемая величина",
            tag: "PV",
            ro: true,
            eng: "мм",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Уставка",
            tag: "SP",
            ro: false,
            eng: "мм",
            type: "number",
            step: 1,
            dec: 0
          },
          {
            name: "Зона нечувствительности",
            tag: "DB",
            ro: false,
            eng: "мм",
            type: "number",
            step: 0.1,
            dec: 1
          },
          {
            name: 'Импульс "Больше"',
            tag: "PU",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: 'Импульс "Меньше"',
            tag: "PD",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: "Положение РО",
            tag: "RO",
            ro: true,
            eng: "%",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Коэффициент пропорциональности",
            tag: "KP",
            ro: false,
            eng: "",
            type: "number",
            step: 0.001,
            dec: 4
          },
          {
            name: "Постоянная времени интегрирования",
            tag: "TI",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Постоянная времени дифференцирования",
            tag: "TD",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Минимальная длительность импульса",
            tag: "MIN",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          },
          {
            name: "Время хода механизма",
            tag: "FMT",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Время люфта",
            tag: "GAP",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          }
        ]
      },
      iS: {
        chartTitle: "Регулятор нагрузки (импульсный)",
        variables: {
          PV: "DB7,REAL14",
          SP: "DB221,REAL26",
          PU: "DB114,X0.0",
          PD: "DB115,X0.0",
          RO: "DB13,REAL14",
          MODE: "DB226,X0.0",
          MU: "DB226,X0.1",
          MD: "DB226,X0.2",
          KP: "DB226,REAL10",
          TI: "DB226,DWORD14",
          TD: "DB226,DWORD18",
          DB: "DB226,REAL6",
          MIN: "DB226,DWORD26",
          FMT: "DB226,DWORD22",
          GAP: "DB226,DINT30"
        },
        params: [
          {
            name: "Регулируемая величина",
            tag: "PV",
            ro: true,
            eng: "кгс/см²",
            type: "number",
            step: 0,
            dec: 3
          },
          {
            name: "Уставка",
            tag: "SP",
            ro: false,
            eng: "кгс/см²",
            type: "number",
            step: 0.1,
            dec: 1
          },
          {
            name: "Зона нечувствительности",
            tag: "DB",
            ro: false,
            eng: "кгс/см²",
            type: "number",
            step: 0.01,
            dec: 2
          },
          {
            name: 'Импульс "Больше"',
            tag: "PU",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: 'Импульс "Меньше"',
            tag: "PD",
            ro: true,
            eng: "",
            type: "text",
            step: 0,
            dec: 0
          },
          {
            name: "Положение РО",
            tag: "RO",
            ro: true,
            eng: "%",
            type: "number",
            step: 0,
            dec: 2
          },
          {
            name: "Коэффициент пропорциональности",
            tag: "KP",
            ro: false,
            eng: "",
            type: "number",
            step: 0.001,
            dec: 4
          },
          {
            name: "Постоянная времени интегрирования",
            tag: "TI",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Постоянная времени дифференцирования",
            tag: "TD",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Минимальная длительность импульса",
            tag: "MIN",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          },
          {
            name: "Время хода механизма",
            tag: "FMT",
            ro: false,
            eng: "мс",
            type: "number",
            step: 1000,
            dec: 0
          },
          {
            name: "Время люфта",
            tag: "GAP",
            ro: false,
            eng: "мс",
            type: "number",
            step: 100,
            dec: 0
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
</style>