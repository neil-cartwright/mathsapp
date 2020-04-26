<template>
  <table class="sums-table table is-bordered" v-for="(num, idx) in arrayPairs" :key="idx">
    <tr>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="border-right:2px solid black; width:50%;">{{ num[1] }}</td>
      <td style="border-top:2px double black; width:50%;">{{ num[0] }}</td>
    </tr>
    <tr v-for="(row, idx) in extraRows" :key="idx">
      <td></td>
      <td>
        <span v-if="idx == 0">&#43;</span>
      </td>
    </tr>
    <tr>
      <td></td>
    </tr>
  </table>
</template>
<script>
export default {
  name: divideSum
};
</script>