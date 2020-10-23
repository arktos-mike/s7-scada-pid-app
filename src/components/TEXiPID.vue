<template>
  <v-row no-gutters style="flex-wrap: nowrap;">
    <v-col cols="3" class="flex-grow-0 flex-shrink-0" style="min-width: 375px;">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Параметр</th>
              <th class="text-left">Значение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="60%">IP-адрес ПЛК</td>
              <td width="40%">
                <v-text-field
                  class="centered-input ma-1"
                  v-model="plc"
                  :disabled="updateStart"
                  hide-details
                  single-line
                  @change="reconnect();"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td width="60%">Цикл опроса ПЛК</td>
              <td width="40%">
                <v-slider
                  v-model="updateCycle"
                  class="align-center mt-10"
                  max="5000"
                  min="0"
                  step="10"
                  @change="updateInterval($event);updateStart=true"
                  thumb-label="always"
                  hide-details
                ></v-slider>
                <v-text-field
                  class="centered-input ma-1"
                  v-model="updateCycle"
                  hide-details
                  single-line
                  step="10"
                  type="number"
                  suffix="мс"
                  @change="updateInterval($event);updateStart=true"
                ></v-text-field>
                <v-btn
                  width="100%"
                  tile
                  :color="updateStart?'primary':'green'"
                  dark
                  large
                  class="ma-1"
                  @click="updateEvent=true;connected();updateStart=!updateStart;updateStart?updateInterval(updateCycle):cancelAutoUpdate();"
                >
                  <v-icon v-if="updateStart" left>mdi-pause</v-icon>
                  <v-icon v-if="!updateStart" left>mdi-play</v-icon>
                  {{updateStart?"ОСТАНОВ":"ЗАПУСК"}}
                </v-btn>
                <v-btn width="100%" tile color="red" dark large class="ma-1" @click="clean">
                  <v-icon left>mdi-trash-can-outline</v-icon>ОЧИСТКА
                </v-btn>
              </td>
            </tr>
            <tr>
              <td width="60%">Режим работы</td>
              <td width="40%">
                <v-switch
                  :disabled="!updateStart||updateCycle>500"
                  width="100%"
                  v-model="values['MODE']"
                  inset
                  :label="`${values['MODE']?'АВТО':'РУЧ'}`"
                  @click="toggleMode"
                ></v-switch>
                <v-btn
                  :disabled="!updateStart||updateCycle>500"
                  width="100%"
                  v-if="!values['MODE']"
                  class="ma-1"
                  tile
                  color="blue darken-4"
                  dark
                  large
                  @mousedown="closeValve"
                  @mouseleave="cstopValve"
                  @mouseup="cstopValve"
                >
                  <v-icon left>mdi-arrow-down-drop-circle-outline</v-icon>ЗАКРЫТЬ
                </v-btn>
                <v-btn
                  :disabled="!updateStart||updateCycle>500"
                  width="100%"
                  v-if="!values['MODE']"
                  class="ma-1"
                  tile
                  color="blue darken-4"
                  dark
                  large
                  @mousedown="openValve"
                  @mouseleave="ostopValve"
                  @mouseup="ostopValve"
                >
                  <v-icon left>mdi-arrow-up-drop-circle-outline</v-icon>ОТКРЫТЬ
                </v-btn>
              </td>
            </tr>
            <tr>
              <td width="60%">Порог записи "по изменению"</td>
              <td width="40%">
                <v-text-field
                  class="centered-input ma-1"
                  v-model="thres"
                  hide-details
                  single-line
                  step="0.1"
                  type="number"
                  :suffix="params[0].eng"
                ></v-text-field>
              </td>
            </tr>
            <tr v-for="item in params.slice(0,6)" :key="item.name">
              <td width="60%">{{ item.name }}</td>
              <td width="40%">
                <v-text-field
                  :disabled="!updateStart||updateCycle>500"
                  class="centered-input"
                  v-model="valuesFixed[item.tag]"
                  hide-details="auto"
                  :step="item.step"
                  :suffix="item.eng"
                  :outlined="!item.ro"
                  :readonly="item.ro"
                  :rounded="item.ro"
                  :type="item.type"
                  :background-color="getColor(values[item.tag])"
                  color="primary"
                  dense
                  placeholder="--"
                  @change="inputValue($event,item.tag);"
                  dark
                ></v-text-field>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col
      cols="9"
      style="min-width: 500px; max-width: 100%;"
      class="flex-grow-1 flex-shrink-1 pl-1"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <highcharts
            :key="rerenderKey"
            :options="chartOptions"
            :updateArgs="updateArgs"
            style="-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;"
          ></highcharts>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Параметр</th>
                  <th class="text-left">Значение</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in params.slice(6,9)" :key="item.name">
                  <td width="60%">{{ item.name }}</td>
                  <td width="40%">
                    <v-text-field
                      :disabled="!updateStart||updateCycle>500"
                      class="centered-input"
                      v-model="valuesFixed[item.tag]"
                      hide-details="auto"
                      :step="item.step"
                      :suffix="item.eng"
                      :outlined="!item.ro"
                      :readonly="item.ro"
                      :rounded="item.ro"
                      :type="item.type"
                      :background-color="getColor(values[item.tag])"
                      color="primary"
                      dense
                      placeholder="--"
                      @change="inputValue($event,item.tag);"
                      dark
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="6">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Параметр</th>
                  <th class="text-left">Значение</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in params.slice(9,12)" :key="item.name">
                  <td width="60%">{{ item.name }}</td>
                  <td width="40%">
                    <v-text-field
                      :disabled="!updateStart||updateCycle>500"
                      class="centered-input"
                      v-model="valuesFixed[item.tag]"
                      hide-details="auto"
                      :step="item.step"
                      :suffix="item.eng"
                      :outlined="!item.ro"
                      :readonly="item.ro"
                      :rounded="item.ro"
                      :type="item.type"
                      :background-color="getColor(values[item.tag])"
                      color="primary"
                      dense
                      placeholder="--"
                      @change="inputValue($event,item.tag);"
                      dark
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Highcharts from "highcharts";
export default {
  components: {},
  props: ["plc", "chartTitle", "variables", "params"],
  data: () => {
    return {
      updateEvent: false,
      thres: 0,
      updateCycle: 50,
      updateStart: false,
      conn: {},
      values: {},
      timer: "",
      rerenderKey: true,
      origHeight: 0,
      origWidth: 0,
      updateArgs: [true, true, { duration: 0 }],
      chartOptions: {
        mapNavigation: {
          enableMouseWheelZoom: true
        },
        navigator: {
          enabled: false,
          adaptToUpdatedData: false
        },
        time: {
          timezoneOffset: -3 * 60
        },
        chart: {
          height: (8.15 / 16) * 100 + "%",
          alignTicks: false,
          zoomType: "xz",
          panning: true,
          panKey: "shift",
          events: {
            redraw: function(e) {
              e.preventDefault();
              const ext = this.xAxis[0].getExtremes();
              if (!this.resetZoomButton & (ext.max - ext.min > 300000)) {
                this.xAxis[0].setExtremes(ext.max - 300000, null);
              }
            }
          }
        },
        boost: {
          useGPUTranslations: true,
          usePreallocated: true
        },
        plotOptions: {
          series: {
            animation: false,
            marker: {
              enabled: false
            }
          }
        },
        credits: {
          enabled: false
        },
        title: {
          text: "",
          align: "center"
        },
        yAxis: [
          {
            title: {
              text: ""
            },
            gridLineColor: "transparent",
            labels: {
              format: "{value}",
              enabled: true
            },
            opposite: true,
            height: "80%",
            index: 0
          },
          {
            gridLineColor: "transparent",
            visible: false,
            opposite: true,
            top: "80%",
            height: "20%",
            index: 1
          }
        ],
        xAxis: [
          {
            type: "datetime",
            dateTimeLabelFormats: {
              millisecond: "%H:%M:%S.%L"
            },
            crosshair: {
              snap: false
            },
            index: 0,
            isX: true,
            minRange: 50,
            events: {
              afterSetExtremes: function() {
                if (
                  !this.chart.resetZoomButton &
                  (Date.now() - this.chart.xAxis[0].max > 1000)
                ) {
                  this.chart.showResetZoom();
                }
              }
            }
          }
        ],
        tooltip: {
          xDateFormat: "%H:%M:%S.%L",
          shared: true
        },
        legend: {
          layout: "horizontal",
          align: "left",
          x: 0,
          verticalAlign: "top",
          y: 0,
          floating: false,
          backgroundColor: "#363635"
        },
        series: [
          {
            color: "#FFED00",
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [
                  0,
                  Highcharts.Color("#FFED00")
                    .setOpacity(0.3)
                    .get("rgba")
                ],
                [
                  1,
                  Highcharts.Color("#FFED00")
                    .setOpacity(0.1)
                    .get("rgba")
                ]
              ]
            },
            name: "Регулируемая величина",
            tooltip: {
              pointFormat: ""
            },
            yAxis: 0,
            type: "areaspline",
            showInNavigator: true,
            data: [] //data-stream-0
          },
          {
            color: "#F57E20",
            step: true,
            name: "Уставка",
            tooltip: {
              pointFormat: ""
            },
            yAxis: 0,
            type: "line",
            data: [] //data-stream-1
          },
          {
            color: "#ED008C",
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [
                  0,
                  Highcharts.Color("#ED008C")
                    .setOpacity(0.3)
                    .get("rgba")
                ],
                [
                  1,
                  Highcharts.Color("#ED008C")
                    .setOpacity(0.1)
                    .get("rgba")
                ]
              ]
            },
            step: true,
            name: `Импульс "Больше"`,
            tooltip: {
              pointFormat: ""
            },
            yAxis: 1,
            type: "area",
            data: [] //data-stream-2
          },
          {
            color: "#01AEF0",
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [
                  0,
                  Highcharts.Color("#01AEF0")
                    .setOpacity(0.3)
                    .get("rgba")
                ],
                [
                  1,
                  Highcharts.Color("#01AEF0")
                    .setOpacity(0.1)
                    .get("rgba")
                ]
              ]
            },
            step: true,
            name: `Импульс "Меньше"`,
            tooltip: {
              pointFormat: ""
            },
            yAxis: 1,
            type: "area",
            data: [] //data-stream-3
          },
          {
            color: "#4CAF50",
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [
                  0,
                  Highcharts.Color("#4CAF50")
                    .setOpacity(0.3)
                    .get("rgba")
                ],
                [
                  1,
                  Highcharts.Color("#4CAF50")
                    .setOpacity(0.1)
                    .get("rgba")
                ]
              ]
            },
            step: true,
            name: "Положение РО",
            tooltip: {
              pointFormatter: function() {
                return (
                  '<span style="color:' +
                  this.series.color +
                  '">\u25CF</span> ' +
                  this.series.name +
                  ": <b>" +
                  Highcharts.numberFormat(this.y * 100, 2, ".") +
                  " %</b><br/>"
                );
              }
            },
            yAxis: 1,
            type: "area",
            data: [] //data-stream-4
          }
        ],
        exporting: {
          buttons: {
            contextButton: {
              menuItems: null,
              onclick: function() {
                if (this.fullscreen.isOpen) {
                  this.fullscreen.close();
                  this.setSize(null, this.origHeight);
                  this.redraw();
                  this.reflow();
                } else {
                  this.origHeight = this.chartHeight;
                  this.origWidth = this.chartWidth;
                  this.fullscreen.open();
                  this.setSize(screen.width, screen.height);
                  this.redraw();
                  this.reflow();
                }
              }
            }
          }
        }
      }
    };
  },
  computed: {
    valuesFixed() {
      const valuesFixed = [];
      this.params.forEach(element => {
        if (typeof this.values[element.tag] !== "undefined") {
          if (element.type == "number") {
            valuesFixed[element.tag] = parseFloat(
              this.values[element.tag]
            ).toFixed(element.dec);
          } else {
            if (this.values[element.tag] != "BAD 255") {
              valuesFixed[element.tag] = this.values[element.tag];
            } else {
              valuesFixed[element.tag] = "--";
            }
          }
        }
      });
      return valuesFixed;
    }
  },
  methods: {
    updateInterval(value) {
      clearInterval(this.timer);
      this.timer = setInterval(this.connected, value);
    },
    inputValue(value, tag) {
      this.conn.writeItems(tag, value);
    },
    fullScreenChanged: function() {
      if (!document.fullscreenElement) {
        this.rerenderKey = !this.rerenderKey;
      }
    },
    clean() {
      this.chartOptions.series.forEach(element => {
        element.data = [];
      });
    },
    connected() {
      this.conn.setTranslationCB(
        function(tag) {
          return this.variables[tag];
        }.bind(this)
      ); // This sets the "translation" to allow us to work with object names
      this.conn.removeItems();
      this.conn.addItems([
        "PV",
        "SP",
        "PU",
        "PD",
        "RO",
        "MODE",
        "MU",
        "MD",
        "KP",
        "TI",
        "TD",
        "DB",
        "MIN",
        "FMT",
        "GAP"
      ]);
      this.conn.readAllItems(this.valuesReady);
    },
    valuesReady(err, values) {
      let last = [];
      let prev = [];
      this.values = values;
      if (!this.updateEvent & this.updateStart) {
        this.chartOptions.plotOptions.series.enableMouseTracking = false;
        this.chartOptions.xAxis[0].crosshair.width = 0;
        this.chartOptions.navigator.enabled = false;
        //////////////////////
        if (Number.isFinite(values["PV"])) {
          if (this.chartOptions.series[0].data.length > 2) {
            last = this.chartOptions.series[0].data.pop();
            if (Math.abs(last[1] - values["PV"]) >= this.thres) {
              this.chartOptions.series[0].data.push(last);
              this.chartOptions.series[0].data.push([
                Date.now(),
                parseFloat(values["PV"])
              ]);
            } else {
              prev = this.chartOptions.series[0].data.pop();
              if (Math.abs(last[1] - prev[1]) >= this.thres) {
                this.chartOptions.series[0].data.push(prev);
                this.chartOptions.series[0].data.push(last);
                this.chartOptions.series[0].data.push([
                  Date.now(),
                  parseFloat(values["PV"])
                ]);
              } else {
                this.chartOptions.series[0].data.push(prev);
                this.chartOptions.series[0].data.push([
                  Date.now(),
                  parseFloat(values["PV"])
                ]);
              }
            }
          } else {
            this.chartOptions.series[0].data.push([
              Date.now(),
              parseFloat(values["PV"])
            ]);
          }
        }
        //////////////////////
        if (Number.isFinite(values["SP"])) {
          if (this.chartOptions.series[1].data.length > 2) {
            last = this.chartOptions.series[1].data.pop();
            if (last[1] != values["SP"]) {
              this.chartOptions.series[1].data.push(last);
              this.chartOptions.series[1].data.push([
                Date.now(),
                parseFloat(values["SP"])
              ]);
            } else {
              prev = this.chartOptions.series[1].data.pop();
              if (last[1] != prev[1]) {
                this.chartOptions.series[1].data.push(prev);
                this.chartOptions.series[1].data.push(last);
                this.chartOptions.series[1].data.push([
                  Date.now(),
                  parseFloat(values["SP"])
                ]);
              } else {
                this.chartOptions.series[1].data.push(prev);
                this.chartOptions.series[1].data.push([
                  Date.now(),
                  parseFloat(values["SP"])
                ]);
              }
            }
          } else {
            this.chartOptions.series[1].data.push([
              Date.now(),
              parseFloat(values["SP"])
            ]);
          }
        }
        //////////////////////
        if (typeof values["PU"] === "boolean") {
          if (this.chartOptions.series[2].data.length > 2) {
            last = this.chartOptions.series[2].data.pop();
            if (last[1] != values["PU"]) {
              this.chartOptions.series[2].data.push(last);
              this.chartOptions.series[2].data.push([
                Date.now(),
                values["PU"] ? 1 : 0
              ]);
            } else {
              prev = this.chartOptions.series[2].data.pop();
              if (last[1] != prev[1]) {
                this.chartOptions.series[2].data.push(prev);
                this.chartOptions.series[2].data.push(last);
                this.chartOptions.series[2].data.push([
                  Date.now(),
                  values["PU"] ? 1 : 0
                ]);
              } else {
                this.chartOptions.series[2].data.push(prev);
                this.chartOptions.series[2].data.push([
                  Date.now(),
                  values["PU"] ? 1 : 0
                ]);
              }
            }
          } else {
            if (typeof values["PU"] === "boolean") {
              this.chartOptions.series[2].data.push([
                Date.now(),
                values["PU"] ? 1 : 0
              ]);
            }
          }
        }
        //////////////////////
        if (typeof values["PD"] === "boolean") {
          if (this.chartOptions.series[3].data.length > 2) {
            last = this.chartOptions.series[3].data.pop();
            if (last[1] != values["PD"]) {
              this.chartOptions.series[3].data.push(last);
              this.chartOptions.series[3].data.push([
                Date.now(),
                values["PD"] ? 1 : 0
              ]);
            } else {
              prev = this.chartOptions.series[3].data.pop();
              if (last[1] != prev[1]) {
                this.chartOptions.series[3].data.push(prev);
                this.chartOptions.series[3].data.push(last);
                this.chartOptions.series[3].data.push([
                  Date.now(),
                  values["PD"] ? 1 : 0
                ]);
              } else {
                this.chartOptions.series[3].data.push(prev);
                this.chartOptions.series[3].data.push([
                  Date.now(),
                  values["PD"] ? 1 : 0
                ]);
              }
            }
          } else {
            if (typeof values["PD"] === "boolean") {
              this.chartOptions.series[3].data.push([
                Date.now(),
                values["PD"] ? 1 : 0
              ]);
            }
          }
        }
        //////////////////////
        if (Number.isFinite(values["RO"])) {
          if (this.chartOptions.series[4].data.length > 2) {
            last = this.chartOptions.series[4].data.pop();
            if (Math.abs(last[1] - values["RO"] / 100) >= 0.01) {
              this.chartOptions.series[4].data.push(last);
              this.chartOptions.series[4].data.push([
                Date.now(),
                parseFloat(values["RO"]) / 100
              ]);
            } else {
              prev = this.chartOptions.series[4].data.pop();
              if (Math.abs(last[1] - prev[1]) >= 0.01) {
                this.chartOptions.series[4].data.push(prev);
                this.chartOptions.series[4].data.push(last);
                this.chartOptions.series[4].data.push([
                  Date.now(),
                  parseFloat(values["RO"]) / 100
                ]);
              } else {
                this.chartOptions.series[4].data.push(prev);
                this.chartOptions.series[4].data.push([
                  Date.now(),
                  parseFloat(values["RO"]) / 100
                ]);
              }
            }
          } else {
            this.chartOptions.series[4].data.push([
              Date.now(),
              parseFloat(values["RO"]) / 100
            ]);
          }
        }
        //////////////////////
      } else {
        this.chartOptions.plotOptions.series.enableMouseTracking = true;
        this.chartOptions.xAxis[0].crosshair.width = 1;
        this.chartOptions.navigator.enabled = true;
        if (Number.isFinite(values["PV"])) {
          this.chartOptions.series[0].data.push([
            Date.now(),
            parseFloat(values["PV"])
          ]);
        }
        if (Number.isFinite(values["SP"])) {
          this.chartOptions.series[1].data.push([
            Date.now(),
            parseFloat(values["SP"])
          ]);
        }
        if (typeof values["PU"] === "boolean") {
          this.chartOptions.series[2].data.push([
            Date.now(),
            values["PU"] ? 1 : 0
          ]);
        }
        if (typeof values["PD"] === "boolean") {
          this.chartOptions.series[3].data.push([
            Date.now(),
            values["PD"] ? 1 : 0
          ]);
        }
        if (Number.isFinite(values["RO"])) {
          this.chartOptions.series[4].data.push([
            Date.now(),
            parseFloat(values["RO"]) / 100
          ]);
        }
        this.chartOptions.series.forEach(element => {
          element.data.push([Date.now() + 0.01, null]);
        });
        this.updateEvent = false;
      }
    },
    getColor(value) {
      if (typeof value !== "undefined") {
        switch (value.toString()) {
          case "BAD 255":
            return "red";
          case "true":
            return "green";
          case "false":
            return "red";
        }
      }
    },
    openValve() {
      this.conn.writeItems("MU", true);
    },
    closeValve() {
      this.conn.writeItems("MD", true);
    },
    ostopValve() {
      this.conn.writeItems("MU", false);
    },
    cstopValve() {
      this.conn.writeItems("MD", false);
    },
    toggleMode() {
      this.conn.writeItems("MODE", !this.values["MODE"]);
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    reconnect() {
      this.conn.dropConnection();
      clearInterval(this.timer);
      this.clean();
      this.conn.initiateConnection(
        { port: 102, host: this.plc, rack: 0, slot: 1 },
        this.connected
      );
      this.$emit('update:plc', this.plc);
    }
  },
  created() {
    this.conn = new this.$nodes7();
    this.conn.initiateConnection(
      { port: 102, host: this.plc, rack: 0, slot: 1 },
      this.connected
    );
    switch (this.params[0].dec) {
      case 1:
        this.thres = 4;
        break;
      case 2:
        this.thres = 0.5;
        break;
      case 3:
        this.thres = 0.1;
        break;
    }
  },
  mounted() {
    this.clean();
    this.$el.addEventListener("fullscreenchange", this.fullScreenChanged);
    this.chartOptions.title.text = this.chartTitle;
    this.chartOptions.series[0].tooltip.pointFormat =
      '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.' +
      this.params[0].dec +
      "f} " +
      this.params[0].eng +
      "</b><br/>";
    this.chartOptions.series[1].tooltip.pointFormat =
      '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.' +
      this.params[1].dec +
      "f} " +
      this.params[1].eng +
      "</b><br/>";
    this.chartOptions.series[2].tooltip.pointFormat =
      '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.' +
      this.params[3].dec +
      "f}</b><br/>";
    this.chartOptions.series[3].tooltip.pointFormat =
      '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.' +
      this.params[4].dec +
      "f}</b><br/>";
  },
  beforeDestroy() {
    this.conn.dropConnection();
    clearInterval(this.timer);
    this.clean();
    this.$el.removeEventListener("fullscreenchange", this.fullScreenChanged);
  }
};
</script>
<style lang="scss" scoped>
.centered-input >>> input {
  text-align: center;
}
</style>