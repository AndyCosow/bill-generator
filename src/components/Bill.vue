<template>
  <div class="container">
    <div class="main">

      <div class="w-400">
        <div v-if="bill.name[1]" class="d-flex space-btw">
          <h2 class="textHover" @click="reverseValue('name')">{{ bill.name[0] }}</h2>
        </div>

        <div v-else class="d-flex space-btw">
          <input ref="name" type="text"
                 v-model="bill.name[0]" @keyup.enter="bill.name[1] = !bill.name[1]">
        </div>
      </div>


      <div class="w-300">
        <div v-if="bill.id[1]" class="d-flex space-btw">
          <h3 class="m-0 textHover" @click="reverseValue('id')">{{ bill.id[0] }}</h3>
        </div>

        <div v-else class="d-flex space-btw">
          <input ref="id" type="text" v-model="bill.id[0]" @keyup.enter="bill.id[1] = !bill.id[1]">
        </div>
      </div>

      <div class="w-300">
        <div v-if="bill.date[1]" class="d-flex space-btw">
          <span class="m-0 d-flex items-center textHover" @click="reverseValue('date')">{{ bill.date[0] }}</span>

        </div>

        <div v-else class="d-flex space-btw">
          <input ref="date" type="text" v-model="bill.date[0]" @keyup.enter="bill.date[1] = !bill.date[1]">
        </div>
      </div>

      <div class="mt-50 d-flex space-btw">

        <div class="w-400">
          <h3 class="pl-10">Pardavėjas</h3>

          <div v-for="(item, index) in bill.seller" :key="index" class="mb-5">
            <div class="space-btw d-flex" v-if="item[1]">
              <span class="textHover" @click="reverseValue('seller', index)">{{ item[0] }}</span>
              <div>
                <span class="ml-10" v-if="index === bill.seller.length-1"
                      @click="deleteSellerOrBuyer(true, index)">
                  <i class="fas fa-trash-alt delete"></i>
                </span>
              </div>
            </div>
            <div v-else class="d-flex space-btw">
              <input v-bind:ref="'seller'+index" type="text" class="w-400"
                     v-model="bill.seller[index][0]"
                     @keyup.enter="bill.seller[index][1] = !bill.seller[index][1]">
            </div>
          </div>

          <div class="pl-10">
            <div class="addOne mt-10" @click="addSellerOrBuyer(true)">
              <i class="fas fa-plus-square"></i>
            </div>
          </div>


        </div>
        <div class="w-400">
          <h3 class="pl-10">Pirkėjas</h3>


          <div v-for="(item, index) in bill.buyer" :key="index" class="mb-5">
            <div class="space-btw d-flex" v-if="item[1]">
              <span class="textHover" @click="reverseValue('buyer', index)">{{ item[0] }}</span>
              <div>
                <span class="ml-10" v-if="index === bill.buyer.length-1"
                      @click="deleteSellerOrBuyer(false, index)">
                  <i class="fas fa-trash-alt delete"></i>
                </span>
              </div>
            </div>
            <div v-else class="d-flex space-btw">
              <input v-bind:ref="'buyer'+index" type="text" class="w-400" v-model="bill.buyer[index][0]"
                     @keyup.enter="bill.buyer[index][1] = !bill.buyer[index][1]">
            </div>
          </div>

          <div class="pl-10">
            <div class="addOne mt-10" @click="addSellerOrBuyer(false)">
              <i class="fas fa-plus-square"></i>
            </div>
          </div>

        </div>

      </div>


      <div class="mt-50 mb-30 pl-10">


        <table>
          <tr>
            <th v-for="(item, index) in bill.table.header" :key="index">

              <div v-if="bill.table.header[index][1]" class="d-flex space-btw items-center p-5">
                <div class="textHover" @click="reverseValueDouble('table', 'header', index)">{{ item[0] }}</div>

                <div class="d-flex">
                  <div class="d-flex items-center">
                    <span class="ml-10 d-flex items-center"
                          v-if="index === bill.table.header.length-1 && bill.table.header.length > 2"
                          @click="addOrDeleteTableHeader(false, index)">
                      <i class="fas fa-trash-alt delete"></i>
                    </span>
                  </div>

                  <div class="addTableHeader ml-10 items-center d-flex"
                       v-if="bill.table.header.length < 6 && index === bill.table.header.length-1"
                       @click="addOrDeleteTableHeader(true, null)">
                    <i class="fas fa-plus-square"></i>
                  </div>
                </div>

              </div>

              <div v-else class="d-flex space-btw p-5">
                <input v-bind:ref="'tableheader'+index" type="text" class="max-w-250"
                       v-model="bill.table.header[index][0]"
                       @keyup.enter="bill.table.header[index][1] = !bill.table.header[index][1]">
              </div>

            </th>
          </tr>

          <tr v-for="(item, index) in bill.table.content" :key="index">
            <td v-for="(itemSecond, indexTwo) in item" :key="indexTwo" class="p-5">


              <div class="d-flex space-btw" v-if="bill.table.content[index][indexTwo][1]">
                <div class="d-flex items-center">
                  <span v-if="indexTwo === 0" @click="deleteTableRow(index)">
                    <i class="fas fa-trash-alt delete"></i>
                  </span>
                  <span class="ml-10 textHover"
                        @click="reverseValueDouble('table', 'content', index, indexTwo)">{{ itemSecond[0] }}</span>
                </div>

              </div>

              <div v-if="!bill.table.content[index][indexTwo][1]"
                   class="d-flex space-btw items-center">
                <input v-bind:ref="'tablecontent'+index+indexTwo"
                       type="text" :class="[indexTwo === 0 ? '' : 'max-w-250']"
                       @keyup.enter="bill.table.content[index][indexTwo][1] = !bill.table.content[index][indexTwo][1]"
                       v-model="bill.table.content[index][indexTwo][0]">
              </div>

            </td>
          </tr>

        </table>

        <div class="addOne p-5 mt-10 d-flex content-center" @click="addTableRow">
          <i class="fas fa-plus-square"></i>
        </div>


      </div>

      <div class="d-flex flex-end">
        <div class="mr-5">
          <div class="d-flex space-btw w-300" v-if="bill.sum[1]">
            <div class="textHover text-center" @click="reverseValue('sum')">{{ bill.sum[0] }}</div>

          </div>

          <div v-if="!bill.sum[1]" class="d-flex">
            <input ref="sum" type="text" v-model="bill.sum[0]" @keyup.enter="bill.sum[1]= !bill.sum[1]">
          </div>
        </div>
      </div>

      <div class="mt-50">
        <div class="d-flex mb-30">
          <input class="checkBox" type="checkbox" v-model="bill.showSignatures">
          <span class="ml-10" @click="bill.showSignatures = !bill.showSignatures">Laukeliai vardams ir parašams</span>
        </div>

        <div class="d-flex space-btw" v-if="bill.showSignatures">
          <div>
            <div class="mb-30">
              Sąskaitą išrašė:
            </div>
            <div class="mb-30">

              <div class="d-flex space-btw" v-if="bill.signatures.seller[1]">
                <span class="textHover" @click="reverseSignatures(true)">{{ bill.signatures.seller[0] }}</span>
              </div>

              <div v-if="!bill.signatures.seller[1]" class="d-flex">
                <input ref="seller" type="text" v-model="bill.signatures.seller[0]"
                       @keyup.enter="bill.signatures.seller[1] = !bill.signatures.seller[1]">
              </div>

            </div>
            <div class="signatures">
              <small>
                (pareigos, vardas, pavardė, parašas)
              </small>
            </div>
          </div>

          <div>
            <div class="mb-30">
              Sąskaitą priėmė:
            </div>
            <div class="mb-30">
              <div class="d-flex space-btw" v-if="bill.signatures.buyer[1]">
                <span class="textHover" @click="reverseSignatures(false)">{{ bill.signatures.buyer[0] }}</span>
              </div>

              <div v-if="!bill.signatures.buyer[1]" class="d-flex">
                <input ref="buyer" type="text" v-model="bill.signatures.buyer[0]"
                       @keyup.enter="bill.signatures.buyer[1] = !bill.signatures.buyer[1]">
              </div>
            </div>
            <div class="signatures">
              <small>
                (pareigos, vardas, pavardė, parašas)
              </small>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="grow1 d-flex space-btw flex-column">
      <GeneratedBill :bill="bill"/>

      <div class="generateButton" :class="[buttonActive ? '' : 'inactive']"
           @click="generateBill">


        <span v-if="buttonActive">Atsisiųsti sąskaitą - PDF</span>
        <span v-else>Šį veiksmą atlikti galėsite po {{ counter }} sekundžių</span>

      </div>
    </div>

  </div>

</template>

<script>
import GeneratedBill from "@/components/GeneratedBill";

export default {
  name: "Bill",
  components: {
    GeneratedBill
  },
  data: () => {
    return {
      bill: {
        name: ["PVM SĄSKAITA FAKTŪRA", true],
        id: ["Serija: N Nr. 3", true],
        date: ["Data: 2020.02.03", true],
        seller: [
          ["Ind. veiklos numeris: 55584587", true],
          ["Jonas Bulijonas", true],
          ["Vytauto g. 12, Vilnius, Lietuva", true],
          ["LT468444888884687", true],
          ["Swedbank", true]
        ],
        buyer: [
          ["Ind. veiklos numeris: 888798788", true],
          ["Tomas Gnomas", true],
          ["Trakų g. 13, Vilnius, Lietuva", true],
          ["LT468444888884687", true],
          ["Seb bankas", true]
        ],
        table: {
          header: [["Paslauga", true], ["Matas", true], ["Vienetai", true], ["Kaina", true], ["Suma", true]],
          content: [
            [['Mokymai "būk žmogus"', true], ['val', true], ['150', true], ["30€", true], ["4500€", true]]
          ]
        },
        sum: ["Galutine suma: 4500€", true],
        showSignatures: false,
        signatures: {
          seller: ["Jonas Bulijonas", true],
          buyer: ["Tomas Gnomas", true],
        }
      },
      buttonActive: true,
      counter: 30
    }
  },
  methods: {

    reverseSignatures(seller) {
      setTimeout(() => {
        this.$refs[seller ? 'seller' : 'buyer'].focus()
      }, 100)
      return this.bill.signatures[seller ? 'seller' : 'buyer'][1] = !this.bill.signatures[seller ? 'seller' : 'buyer'][1]
    },
    reverseValue(name, index) {
      setTimeout(() => {
        if (typeof index === 'number') {
          this.$refs[name + index].focus()
        } else {
          this.$refs[name].focus()
        }
      }, 100)

      if (typeof index === 'number') {
        return this.bill[name][index][1] = !this.bill[name][index][1]
      } else {
        return this.bill[name][1] = !this.bill[name][1]
      }
    },
    reverseValueDouble(first, second, index, indexTwo) {

      setTimeout(() => {
        if (typeof indexTwo === 'number') {
          this.$refs[first + second + index + indexTwo].focus()
        } else {
          this.$refs[first + second + index].focus()
        }

      }, 100)

      if (typeof indexTwo === 'number') {
        return this.bill[first][second][index][indexTwo][1] = !this.bill[first][second][index][indexTwo][1]
      } else {
        return this.bill[first][second][index][1] = !this.bill[first][second][index][1]
      }


    },

    deleteSellerOrBuyer(seller, index) {
      seller ?
          this.bill.seller.splice(index, 1) :
          this.bill.buyer.splice(index, 1)
    },
    addSellerOrBuyer(seller) {
      if (seller) {
        this.bill.seller.push(["-", true])
      } else {
        this.bill.buyer.push(["-", true])
      }
    },
    addOrDeleteTableHeader(add, index) {
      if (add) {
        this.bill.table.header.push(["-", true])
        this.bill.table.content.map((x, index) => {
          this.bill.table.content[index].push(["-", true])
        })
      } else {
        this.bill.table.header.splice(index, 1)
        this.bill.table.content.map((x, indexTwo) => {
          this.bill.table.content[indexTwo].splice(index, 1)
        })
      }
    },
    addTableRow() {
      let newRow = []

      this.bill.table.header.map(() => {
        newRow.push(["-", true])
      })

      this.bill.table.content.push(newRow)
    },
    deleteTableRow(index) {
      this.bill.table.content.splice(index, 1)
    },
    generateBill() {
      if (this.buttonActive) {
        this.buttonActive = false

        let timer = () => {
          if (this.counter > 0) {
            this.counter--
            setTimeout(() => {
              if (this.counter === 0) {
                this.buttonActive = true
                return this.counter = 30
              }
              timer()
            }, 1000)
          }
        }

        timer()

        return this.callApi()
      }
    },
    async callApi() {
      let billHtml = document.getElementById('bill')
      let setHtml = new URLSearchParams({
        'html': billHtml.outerHTML,
      })

      let res = await fetch("http://167.99.138.67:3322/generate", {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: setHtml
      });

      if (res.status === 200) {
        let blob = await res.blob()

        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "saskaita.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }


    }

  },
  watch: {
    bill: {
      handler: function (val) {
        let billAsString = JSON.stringify(val)
        localStorage.setItem('bill', billAsString)
      },
      deep: true
    },
    "bill.table.content": {
      handler: function (val) {
        let totalSum = 0
        val.map(item => {
          let num = ""
          for (let i = 0; i < item[item.length-1][0].length; i++) {
            let symbol = item[item.length-1][0][i].replace(',', ".")

            if(symbol === ".") {
              num += symbol
            } else if ( !isNaN(Number(symbol)) ) {
              num += symbol
            }
          }
          totalSum += Number(num)
        })
        this.bill.sum[0] = `Galutinė suma: ${totalSum}€`
      },
      deep: true
    }
  },
  mounted() {
    if (localStorage.getItem('bill') !== 'null') {
      this.bill = JSON.parse(localStorage.getItem('bill'))
    }

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getUTCMonth()
    const day = date.getDate()

    this.bill.date[0] = `Data: ${year}.${month}.${day}`
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;500&display=swap');

.container {
  font-family: 'Poppins', sans-serif;
  display: flex;
  min-width: 1000px;
  min-height: 100vh;
}

.main {
  padding: 20px;
  background-color: #f6f6f6;
  flex-grow: 1;
}

input {
  border-radius: 5px;
  color: white;
  border: none;
  padding: 4px;
  font-size: 16px;
  background-color: #656565;
}

.edit {
  font-size: 28px;
  Color: #404040;
  cursor: pointer;
}

.accept {
  font-size: 28px;
  Color: #5c9944;
  cursor: pointer;
}


.delete {
  font-size: 24px;
  Color: #bf4416;
  cursor: pointer;
}

.edit:hover,
.delete:hover,
.accept:hover {
  transform: scale(1.2);
}

.addOne {
  background-color: #dedede;
  text-align: center;
  font-size: 25px;
  border-radius: 5px;
  cursor: pointer;
  color: #404040;
}

.addOne:hover {
  background-color: #dbdbdb;
  transform: scale(1.02);
}

.signatures {
  padding-top: 10px;
  border-top: 1px solid black;
}

.checkBox {
  height: 20px;
  width: 20px;
}

table {
  width: 100%;
}

th {
  padding: 2px;
  background-color: #dedede;
}

.addTableHeader {
  font-size: 25px;
  cursor: pointer;
  Color: #404040;

}

.addTableHeader:hover {
  transform: scale(1.2);
}

.generateButton {
  cursor: pointer;
  margin-top: 200px;
  padding: 20px;
  text-align: center;
  background-color: #656565;
  color: #ffffff;
  font-weight: 600;
  font-size: 20px;
}

.generateButton:hover {
  background-color: #767676;
}

.inactive {
  background-color: #a1a1a1;
}

.inactive:hover {
  background-color: #a1a1a1;
}


.w-300 {
  width: 250px;
}

.max-w-250 {
  max-width: 100px;
}

.w-400 {
  width: 400px;
}

.d-flex {
  display: flex;
}

.content-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.grow1 {
  flex-grow: 1;
}

.space-btw {
  justify-content: space-between;
}

.flex-end {
  justify-content: flex-end;
}

.flex-column {
  flex-direction: column;
}

.pl-10 {
  padding-left: 10px;
}

.p-5 {
  padding: 10px 10px;
}

.ml-30 {
  margin-left: 30px;
}

.ml-10 {
  margin-left: 10px;
}

.mt-50 {
  margin-top: 50px;
}

.mb-5 {
  margin-bottom: 5px;
}

.mr-5 {
  margin-right: 5px;
}

.mb-30 {
  margin-bottom: 30px;
}

.m-0 {
  margin: 0;
}

.mt-10 {
  margin-top: 10px;
}

.text-center {
  text-align: center;
}

.textHover {
  border-radius: 5px;
  padding: 0 10px;
  cursor: pointer;
  min-width: 100px;
}

.textHover:hover {
  background-color: #bababa;
}

</style>