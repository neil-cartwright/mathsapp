<template>
  <div class="container">
    <h1
      class="has-text-weight-bold has-text-black-ter has-text-centered is-size-5 noPrint has-font-quicksand"
    >Print Random Sums</h1>

    <hr />

    <div class="columns is-multiline">
      <div class="column is-6 is-offset-3">
        <div class="panel noPrint">
          <div class="panel-heading">
            <div class="field">
              <label class="label">Please select type of sums to print</label>
            </div>
          </div>
          <div class="panel-block">
            <div class="control">
              <div class="panel-controls">
                <p class="label" title="How many sums would you like to print?">Show me</p>
                <input
                  class="input has-text-center"
                  type="number"
                  placeholder="2"
                  min="8"
                  max="32"
                  step="4"
                  v-model="number"
                  @change="reset(); getSums();"
                />
              </div>

              <div class="panel-controls">
                <p class="label" title="What type of sums would you like?">Of type</p>
                <div class="select">
                  <select v-model="operator" @change="reset(); getSums();">
                    <option value="&#43;">Addition</option>
                    <option value="&#8722;">Subtraction</option>
                    <option value="&#215;">Multiplication</option>
                    <option value="&#247;">Division</option>
                  </select>
                </div>
              </div>

              <div class="panel-controls">
                <p class="label">
                  <span
                    v-if="operator != operators.divide"
                    title="Will appear at top of equation"
                  >Top Number</span>
                  <span title="Number being divided" v-else>Dividend</span>
                </p>

                <div class="select">
                  <select v-model="topNumber" @change="reset(); getSums()">
                    <option value="9">Single digits</option>
                    <option value="99">Tens</option>
                    <option value="999">Hundreds</option>
                    <option value="9999">Thousands</option>
                  </select>
                </div>
              </div>

              <div class="panel-controls">
                <p class="label">
                  <span
                    v-if="operator != operators.divide"
                    title="Will appear at foot of equation"
                  >Bottom Number</span>
                  <span title="Number by which to divide" v-else>Divisor</span>
                </p>

                <div class="select">
                  <select v-model="bottomNumber" @change="reset(); getSums();">
                    <option value="9">Single digits</option>
                    <option value="99">Tens</option>
                    <option value="999">Hundreds</option>
                    <option value="9999">Thousands</option>
                  </select>
                </div>
              </div>

              <div class="field is-grouped buttons">
                <p class="control">
                  <button
                    v-if="!showPrintButton"
                    class="get-sums button is-light"
                    @click="getSums()"
                  >Get Sums</button>
                </p>

                <p class="control">
                  <button
                    v-if="showPrintButton"
                    class="get-sums button is-primary"
                    @click="printDoc()"
                  >Print</button>
                </p>

                <p class="control" v-if="createTables">
                  <button class="button is-danger" @click="reset()">Reset</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <transition name="fade" mode="in-out">
          <div
            v-if="createTables && operator != operators.divide"
            class="notification has-tables is-white is-flex is-relative"
          >
            <span class="tag is-white notification-tag is-rounded">Print area: {{ number }} sums</span>
            <div class="grid">
              <table
                class="sums-table table is-bordered is-striped is-relative"
                v-for="(num, idx) in arrayPairs"
                :key="idx"
              >
                <span class="tag is-white sum-number is-rounded">{{idx + 1}}</span>
                <tr>
                  <td>{{ num[0] }}</td>
                  <td v-html="operator">{{ operator }}</td>
                </tr>
                <tr>
                  <td>{{ num[1] }}</td>
                  <td></td>
                </tr>
                <tr v-for="(row, idx) in extraRows" :key="idx">
                  <td></td>
                  <td>
                    <span v-if="idx == 0" class="has-text-success">&#43;</span>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>&#61;</td>
                </tr>
              </table>
            </div>
          </div>
        </transition>

        <!-- different layout for division sums -->

        <transition name="fade" mode="in-out">
          <div
            v-if="operator == operators.divide && createTables"
            class="notification is-white has-tables is-flex"
          >
            <span class="tag is-white notification-tag is-rounded">Print area: {{ number }} sums</span>

            <div class="grid division-grid">
              <table
                class="division-tables sums-table table is-bordered"
                v-for="(num, idx) in arrayPairs"
                :key="idx"
              >
                <span class="tag is-white sum-number is-rounded">{{idx + 1}}</span>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td id="divisor">{{ num[1] }}</td>
                  <td id="dividend">{{ num[0] }}</td>
                </tr>
              </table>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- modal for android printing -->
    <div class="notification printer-alert is-danger" v-if="printerAlert">
      <p>On Android? Open handset menu for printing</p>
      <button class="button is-success is-small" @click="printerAlert = false">Okey Doke</button>
    </div>
    <!-- end modal -->
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
<script>
export default {
  data: function() {
    return {
      operators: {
        add: "&#43;",
        subtract: "&#8722;",
        multiply: "&#215;",
        divide: "&#247;"
      },
      number: 16,
      topNumber: 9,
      bottomNumber: 9,
      operator: "&#43;",
      multiplyCode: "&#215;",
      randomNums: [],
      arrayPairs: [],
      showPrintButton: false,
      extraRows: 0,
      createTables: false,
      printerAlert: false
    };
  },

  methods: {
    getRandomNumber: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // switches every other number to the one chosen in min select field
    addBottomNumbers: function() {
      for (var i = 0; i < this.number * 2; i++) {
        // check if odd number
        if (i % 2 == 1) {
          // get a minimum number for the getRandomNumber function
          let minNum = Math.ceil(this.bottomNumber / 10);
          // let item = Math.floor(Math.random() * this.bottomNumber) + 1;
          let item = this.getRandomNumber(minNum, this.bottomNumber);
          // remove one item and position i and add item at that position
          this.randomNums.splice(i, 1, item);
        }
      }
    },
    getTopNumbers: function() {
      // get twice as many numbers as sums required
      for (var i = 0; i < this.number * 2; i++) {
        // get a minimum number for the getRandomNumber function
        let minNum = Math.ceil(this.topNumber / 10);
        // run get Rand Number function and save result
        let randomNumber = this.getRandomNumber(minNum, this.topNumber);
        // put that number in an array
        this.randomNums.push(randomNumber);
      }
      // run a function which switches every other number to the one chosen in minimum select field
      this.addBottomNumbers();
      return this.randomNums;
    },
    makePairs: function() {
      // create a bunch of arrays with two numbers in each
      let numsArray = this.getTopNumbers();
      let arrayPair = [];
      numsArray.forEach(n => {
        arrayPair.push(n);
        if (arrayPair.length == 2) {
          this.arrayPairs.push(arrayPair);
          arrayPair = [];
        }
      });
      this.createTables = true;
      this.showPrintButton = true;
    },
    calcExtraRowsForMult: function() {
      if (this.operator == "&#215;") {
        if (this.bottomNumber > 10 || this.topNumber > 10) {
          this.extraRows = 2;
          if (this.bottomNumber > 100 || this.topNumber > 100) {
            this.extraRows = 3;
            if (this.bottomNumber > 100 && this.topNumber > 100) {
              this.extraRows = 4;
            }
          }
        }
      }
    },
    getSums: function() {
      this.makePairs();
      this.calcExtraRowsForMult();
    },
    beforePrint: function() {
      this.printerAlert = true;
    },
    printDoc: function() {
      this.beforePrint();
      window.print();
      this.showPrintButton = false;
    },
    reset: function() {
      this.randomNums = [];
      this.arrayPairs = [];
      this.showPrintButton = false;
      this.createTables = false;
      this.extraRows = 0;
    }
  },

  computed: {}
};
</script>
