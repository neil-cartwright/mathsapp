<template>
  <table class="sums-table table is-bordered" v-for="(num, idx) in arrayPairs" :key="idx">
    <tr>
      <td>{{ num[0] }}</td>
      <td v-html="operator">{{ operator }}</td>
    </tr>
    <tr>
      <td>{{ num[1] }}</td>
    </tr>
    <tr v-for="(row, idx) in extraRows" :key="idx">
      <td></td>
      <td>
        <span v-if="idx == 0">&#43;</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>&#61;</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "normalSum",
  props: {
    msg: String
  }
};
</script>