<template>
  <div class="container">
    <h1 class="has-text-weight-bold has-text-black-ter is-size-3 noPrint">
      Print Random Sums
    </h1>

    <hr />

    <div class="columns">
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
                <p class="label">Show me</p>
                <input
                  class="input has-text-center"
                  type="number"
                  placeholder="2"
                  min="10"
                  max="50"
                  step="2"
                  v-model="number"
                />
              </div>

              <div class="panel-controls">
                <p class="label">Of type</p>
                <div class="select">
                  <select v-model="operator">
                    <option value="&#43;">Addition</option>
                    <option value="&#8722;">Subtraction</option>
                    <option value="&#215;">Multiplication</option>
                    <option value="&#247;">Division</option>
                  </select>
                </div>
              </div>

              <div class="panel-controls">
                <p class="label">
                  with Max Values
                </p>

                <div class="select">
                  <select v-model="quantifiers">
                    <option value="10">In single digits</option>
                    <option value="100">In Tens</option>
                    <option value="1000">In Hundreds</option>
                    <option value="10000">In Thousands</option>
                    <option value="100000">In Ten Thousands</option>
                    <option value="1000000">In Hundred Thousands</option>
                    <option value="10000000">In Millions</option>
                  </select>
                </div>
              </div>

              <div class="field is-grouped buttons">
                <p class="control">
                  <button
                    v-if="!showPrintButton"
                    class="get-sums button is-light"
                    @click="makePairs()"
                  >
                    Get Sums
                  </button>
                </p>

                <p class="control">
                  <button
                    v-if="showPrintButton"
                    class="get-sums button is-primary"
                    @click="printDoc()"
                  >
                    Print
                  </button>
                </p>

                <p class="control" v-if="activateNotification">
                  <button class="button is-danger" @click="reset()">
                    Reset
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activateNotification" class="notification has-tables is-flex">
      <table
        class="table is-bordered"
        v-for="(num, idx) in arrayPairs"
        :key="idx"
      >
        <tr>
          <td>{{ num[0] }}</td>
          <td v-html="operator">{{ operator }}</td>
        </tr>
        <tr>
          <td>{{ num[1] }}</td>
        </tr>
        <tr>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped></style>
<script>
export default {
  data: function() {
    return {
      number: 10,
      quantifiers: 10,
      operator: "&#43;",
      randomNums: [],
      arrayPairs: [],
      activateNotification: false,
      showPrintButton: false,
    };
  },

  methods: {
    getRandomNumbers: function() {
      for (var i = 0; i < this.number * 2; i++) {
        this.randomNums.push(Math.floor(Math.random() * this.quantifiers));
      }
      return this.randomNums;
    },
    makePairs: function() {
      this.activateNotification = true;
      let numsArray = this.getRandomNumbers();
      let arrayPair = [];
      numsArray.forEach((n) => {
        arrayPair.push(n);
        if (arrayPair.length == 2) {
          this.arrayPairs.push(
            arrayPair.sort(function(a, b) {
              return b - a;
            })
          );
          arrayPair = [];
        }
      });
      this.showPrintButton = true;
    },
    printDoc: function() {
      window.print();
      this.showPrintButton = false;
    },
    reset: function() {
      this.arrayPairs = [];
      this.showPrintButton = false;
      this.activateNotification = false;
    },
  },

  computed: {},
};
</script>
