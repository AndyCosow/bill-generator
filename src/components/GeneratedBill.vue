<template>

  <div id="bill" style="font-family: Arial,serif; padding: 20px;">

    <h3>{{bill.name[0]}}</h3>
    <h3>{{bill.id[0]}}</h3>
    <div>{{bill.date[0]}}</div>

    <div style="display: flex; margin-top: 20px">
      <div id="sellerInfo" style="width: 50%">
        <h4>{{bill.participants.seller[0]}}</h4>
        <div v-for="(item, index) in bill.seller" :key="index">
          {{item[0]}}
        </div>
      </div>

      <div id="buyerInfo" style="width: 50%">
        <h4>{{ bill.participants.buyer[0] }}</h4>
        <div v-for="(item, index) in bill.buyer" :key="index">
          {{item[0]}}
        </div>
      </div>

    </div>

    <div style="margin-top: 50px">
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <th style="text-align: start; padding: 5px; border: 1px solid black" v-for="(item, index) in bill.table.header" :key="index">
            {{ item[0] }}
          </th>
        </tr>
        <tr v-for="(item, index) in bill.table.content" :key="index">
          <td style="padding: 5px; border: 1px solid black" v-for="(tableContent, index) in item" :key="index">
            {{ tableContent[0] }}
          </td>
        </tr>
      </table>

      <div style="text-align: end; padding: 20px 0px; font-size: 18px">
        <span style="border-bottom: 1px solid black; padding-bottom: 5px">{{ bill.sum[0] }}</span>
      </div>
    </div>

    <div v-if="bill.showNotes" style="margin-top: 100px; max-width: 770px">
      <div style="margin-bottom: 20px">
        {{bill.notes.title[0]}}
      </div>
      <div>
        {{bill.notes.value[0]}}
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 100px"
    v-if="bill.showSignatures">

      <div style="width: 200px">
        {{ bill.props.seller[0] }}
        <div style="padding: 30px 0px" :style="signatureSpace(true)">{{bill.signatures.seller[0]}}</div>
        <div style="border-bottom: 1px solid black; margin-bottom: 5px"></div>
        <div><small>{{ bill.props.sellerSign[0] }}</small></div>
      </div>

      <div style="width: 200px">
        {{ bill.props.buyer[0] }}
        <div style="padding: 30px 0px" :style="signatureSpace(false)"
        >{{bill.signatures.buyer[0]}}</div>
        <div style="border-bottom: 1px solid black; margin-bottom: 5px"></div>
        <div><small>{{ bill.props.buyerSign[0] }}</small></div>
      </div>

    </div>



  </div>
</template>

<script>
export default {
name: "generatedBill",
  props: ['bill'],
  methods: {
    signatureSpace(seller) {
      if(seller && this.bill.signatures.seller[0].length === 0) {
        return {height: 18+ "px"}
      }
      if(!seller && this.bill.signatures.buyer[0].length === 0) {
        return {height: 18+ "px"}
      }
    }
  }
}
</script>

<style scoped>

</style>