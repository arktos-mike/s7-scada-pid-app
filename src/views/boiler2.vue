<template>
  <v-container fluid class="mx-auto pa-0">
    <div class="primary hidden-sm-and-down">
      <h2 class="ml-2">Котёл КВГМ-20 ст.№2</h2>
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
      <v-tab-item>
        <TEXiPID
          ref="iWcomp"
          :plc="plc"
          :chartTitle="iW.chartTitle"
          :variables="iW.variables"
          :params="iW.params"
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
  name: "boiler2",
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
      if (typeof this.$refs.iWcomp != "undefined") {
        this.$refs.iScomp.cancelAutoUpdate();
        this.$refs.iScomp.updateStart = false;
      }
    }
  },
  data: () => {
    return {
      plc: "192.168.0.204",
      aA: {
        chartTitle: "Регулятор воздуха (аналоговый)",
        variables: {
          PV: "DB1,REAL620",
          SP: "DB20,REAL2",
          RO: "DB1,REAL900",
          SR: "DB1,REAL1592",
          MODE: "DB18,X0.0",
          MU: "DB18,X0.1",
          MD: "DB18,X0.2",
          MS: "DB18,REAL2",
          KP: "DB18,REAL20",
          TI: "DB18,DWORD24",
          TD: "DB18,DWORD28",
          DB: "DB18,REAL16"
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
          PV: "DB1,REAL452",
          SP: "DB20,REAL6",
          RO: "DB1,REAL956",
          SR: "DB1,REAL1636",
          MODE: "DB19,X0.0",
          MU: "DB19,X0.1",
          MD: "DB19,X0.2",
          MS: "DB19,REAL2",
          KP: "DB19,REAL20",
          TI: "DB19,DWORD24",
          TD: "DB19,DWORD28",
          DB: "DB19,REAL16"
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
          PV: "DB1,REAL620",
          SP: "DB20,REAL2",
          PU: "DB1,X1467.0",
          PD: "DB1,X1471.0",
          RO: "DB1,REAL788",
          MODE: "DB16,X0.0",
          MU: "DB16,X0.1",
          MD: "DB16,X0.2",
          KP: "DB16,REAL10",
          TI: "DB16,DWORD14",
          TD: "DB16,DWORD18",
          DB: "DB16,REAL6",
          MIN: "DB16,DWORD26",
          FMT: "DB16,DWORD22",
          GAP: "DB16,DINT30"
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
          PV: "DB1,REAL452",
          SP: "DB20,REAL6",
          PU: "DB1,X1475.0",
          PD: "DB1,X1479.0",
          RO: "DB1,REAL844",
          MODE: "DB17,X0.0",
          MU: "DB17,X0.1",
          MD: "DB17,X0.2",
          KP: "DB17,REAL10",
          TI: "DB17,DWORD14",
          TD: "DB17,DWORD18",
          DB: "DB17,REAL6",
          MIN: "DB17,DWORD26",
          FMT: "DB17,DWORD22",
          GAP: "DB17,DINT30"
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
      iW: {
        chartTitle: "Регулятор нагрузки (импульсный)",
        variables: {
          PV: "DB1,REAL172",
          SP: "DB4,REAL48",
          PU: "DB1,X1459.0",
          PD: "DB1,X1463.0",
          RO: "DB1,REAL732",
          MODE: "DB6,X0.0",
          MU: "DB6,X0.1",
          MD: "DB6,X0.2",
          KP: "DB6,REAL10",
          TI: "DB6,DWORD14",
          TD: "DB6,DWORD18",
          DB: "DB6,REAL6",
          MIN: "DB6,DWORD26",
          FMT: "DB6,DWORD22",
          GAP: "DB6,DINT30"
        },
        params: [
          {
            name: "Регулируемая величина",
            tag: "PV",
            ro: true,
            eng: "°C",
            type: "number",
            step: 0,
            dec: 3
          },
          {
            name: "Уставка",
            tag: "SP",
            ro: false,
            eng: "°C",
            type: "number",
            step: 0.1,
            dec: 1
          },
          {
            name: "Зона нечувствительности",
            tag: "DB",
            ro: false,
            eng: "°C",
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
      }
    };
  }
};
</script>

<style scoped>
</style>