<template>
  <div class="container">
    <h1 class="has-text-weight-bold has-text-black-ter is-size-3">
      Print Random Sums
    </h1>

    <hr />

    <div class="panel">
      <div class="panel-heading">
        <div class="field">
          <label class="label">How many sums would you like to print?</label>
        </div>
      </div>
      <div class="panel-block">
        <div class="control">
          <div>
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

          <div>
            <p class="label">Of type</p>
            <div class="select">
              <select v-model="operator">
                <option value="&#43;">Addition sums</option>
                <option value="&#8722;">Subtraction sums</option>
                <option value="&#215;">Multiplication sums</option>
                <option value="&#247;">Division sums</option>
              </select>
            </div>
          </div>

          <div>
            <p class="label">
              with Max Values
            </p>

            <div class="select">
              <select v-model="maxNumber">
                <option value="10">In single digits</option>
                <option value="100">In Tens</option>
                <option value="1000">In Hundreds</option>
                <option value="10000">In Thousands</option>
                <option value="100000">In Ten Thousands</option>
              </select>
            </div>
          </div>

          <button class="get-sums button is-light" @click="makePairs()">
            Submit
          </button>
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
      maxNumber: 10,
      operator: "+",
      data: "Data",
      randomNums: [],
      arrayPairs: [],
      activateNotification: false,
    };
  },

  methods: {
    getRandomNumbers: function() {
      for (var i = 0; i < this.number * 2; i++) {
        this.randomNums.push(Math.floor(Math.random() * this.maxNumber));
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
    },
  },

  computed: {},
};
</script>
