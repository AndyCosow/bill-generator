<template>
    <div class="container">
        <div class="main">
            <div class="w-400">
                <div v-if="bill.name[1]" class="d-flex space-btw">
                    <h2 class="text-hover" @click="reverseValue('name')">{{ bill.name[0] }}</h2>
                </div>

                <div v-else class="d-flex space-btw">
                    <input ref="name" type="text" v-model="bill.name[0]" @keyup.enter="bill.name[1] = !bill.name[1]" />
                </div>
            </div>

            <div class="w-300">
                <div v-if="bill.id[1]" class="d-flex space-btw">
                    <h3 class="m-0 text-hover" @click="reverseValue('id')">{{ bill.id[0] }}</h3>
                </div>

                <div v-else class="d-flex space-btw">
                    <input ref="id" type="text" v-model="bill.id[0]" @keyup.enter="bill.id[1] = !bill.id[1]" />
                </div>
            </div>

            <div class="w-300">
                <div v-if="bill.date[1]" class="d-flex space-btw">
                    <span class="m-0 d-flex items-center text-hover" @click="reverseValue('date')">{{
                        bill.date[0]
                    }}</span>
                </div>

                <div v-else class="d-flex space-btw">
                    <input ref="date" type="text" v-model="bill.date[0]" @keyup.enter="bill.date[1] = !bill.date[1]" />
                </div>
            </div>

            <div class="mt-50 d-flex space-btw">
                <div class="w-400">
                    <h3 class="pl-10 text-hover" @click="reverseParticipants(true)" v-if="bill.participants.seller[1]">
                        {{ bill.participants.seller[0] }}
                    </h3>
                    <div v-else class="d-flex space-btw">
                        <input
                            ref="participantOne"
                            type="text"
                            class="w-400"
                            v-model="bill.participants.seller[0]"
                            @keyup.enter="bill.participants.seller[1] = !bill.participants.seller[1]"
                        />
                    </div>

                    <div v-for="(item, index) in bill.seller" :key="index" class="mb-5">
                        <div class="space-btw d-flex" v-if="item[1]">
                            <span class="text-hover" @click="reverseValue('seller', index)">{{ item[0] }}</span>
                            <div>
                                <span
                                    class="ml-10"
                                    v-if="index === bill.seller.length - 1"
                                    @click="deleteSellerOrBuyer(true, index)"
                                >
                                    <i class="fas fa-trash-alt delete"></i>
                                </span>
                            </div>
                        </div>
                        <div v-else class="d-flex space-btw">
                            <input
                                v-bind:ref="'seller' + index"
                                type="text"
                                class="w-400"
                                v-model="bill.seller[index][0]"
                                @keyup.enter="bill.seller[index][1] = !bill.seller[index][1]"
                            />
                        </div>
                    </div>

                    <div class="pl-10">
                        <div class="add-one mt-10" @click="addSellerOrBuyer(true)">
                            <i class="fas fa-plus-square"></i>
                        </div>
                    </div>
                </div>
                <div class="w-400">
                    <h3 class="pl-10 text-hover" @click="reverseParticipants(false)" v-if="bill.participants.buyer[1]">
                        {{ bill.participants.buyer[0] }}
                    </h3>
                    <div v-else class="d-flex space-btw">
                        <input
                            ref="participantTwo"
                            type="text"
                            class="w-400"
                            v-model="bill.participants.buyer[0]"
                            @keyup.enter="bill.participants.buyer[1] = !bill.participants.buyer[1]"
                        />
                    </div>

                    <div v-for="(item, index) in bill.buyer" :key="index" class="mb-5">
                        <div class="space-btw d-flex" v-if="item[1]">
                            <span class="text-hover" @click="reverseValue('buyer', index)">{{ item[0] }}</span>
                            <div>
                                <span
                                    class="ml-10"
                                    v-if="index === bill.buyer.length - 1"
                                    @click="deleteSellerOrBuyer(false, index)"
                                >
                                    <i class="fas fa-trash-alt delete"></i>
                                </span>
                            </div>
                        </div>
                        <div v-else class="d-flex space-btw">
                            <input
                                v-bind:ref="'buyer' + index"
                                type="text"
                                class="w-400"
                                v-model="bill.buyer[index][0]"
                                @keyup.enter="bill.buyer[index][1] = !bill.buyer[index][1]"
                            />
                        </div>
                    </div>

                    <div class="pl-10">
                        <div class="add-one mt-10" @click="addSellerOrBuyer(false)">
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
                                <div class="text-hover" @click="reverseValueDouble('table', 'header', index)">
                                    {{ item[0] }}
                                </div>

                                <div class="d-flex">
                                    <div class="d-flex items-center">
                                        <span
                                            class="ml-10 d-flex items-center"
                                            v-if="
                                                index === bill.table.header.length - 1 && bill.table.header.length > 2
                                            "
                                            @click="addOrDeleteTableHeader(false, index)"
                                        >
                                            <i class="fas fa-trash-alt delete"></i>
                                        </span>
                                    </div>

                                    <div
                                        class="add-table-header ml-10 items-center d-flex"
                                        v-if="bill.table.header.length < 6 && index === bill.table.header.length - 1"
                                        @click="addOrDeleteTableHeader(true, null)"
                                    >
                                        <i class="fas fa-plus-square"></i>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="d-flex space-btw p-5">
                                <input
                                    v-bind:ref="'tableheader' + index"
                                    type="text"
                                    class="max-w-250"
                                    v-model="bill.table.header[index][0]"
                                    @keyup.enter="bill.table.header[index][1] = !bill.table.header[index][1]"
                                />
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
                                    <span
                                        class="ml-10 text-hover"
                                        @click="reverseValueDouble('table', 'content', index, indexTwo)"
                                        >{{ itemSecond[0] }}</span
                                    >
                                </div>
                            </div>

                            <div v-if="!bill.table.content[index][indexTwo][1]" class="d-flex space-btw items-center">
                                <input
                                    v-bind:ref="'tablecontent' + index + indexTwo"
                                    type="text"
                                    :class="[indexTwo === 0 ? '' : 'max-w-250']"
                                    @keyup.enter="
                                        bill.table.content[index][indexTwo][1] = !bill.table.content[index][indexTwo][1]
                                    "
                                    v-model="bill.table.content[index][indexTwo][0]"
                                />
                            </div>
                        </td>
                    </tr>
                </table>

                <div class="add-one p-5 mt-10 d-flex content-center" @click="addTableRow">
                    <i class="fas fa-plus-square"></i>
                </div>
            </div>

            <div class="d-flex flex-end">
                <div class="mr-5">
                    <div class="d-flex space-btw w-300" v-if="bill.sum[1]">
                        <div class="text-hover text-center" @click="reverseValue('sum')">{{ bill.sum[0] }}</div>
                    </div>

                    <div v-if="!bill.sum[1]" class="d-flex">
                        <input ref="sum" type="text" v-model="bill.sum[0]" @keyup.enter="bill.sum[1] = !bill.sum[1]" />
                    </div>
                </div>
            </div>

            <div class="mt-50 ml-10">
                <div class="d-flex mb-30">
                    <input class="checkBox" type="checkbox" v-model="bill.showNotes" />
                    <span class="ml-10" @click="bill.showNotes = !bill.showNotes">Papildomi įrašai</span>
                </div>

                <div v-if="bill.showNotes">
                    <div
                        class="mb-30 text-hover w-300"
                        @click="reverseNotes('title', 'notesTitle')"
                        v-if="bill.notes.title[1]"
                    >
                        {{ bill.notes.title[0] }}
                    </div>

                    <div v-else class="d-flex space-btw mb-30">
                        <input
                            ref="notesTitle"
                            type="text"
                            v-model="bill.notes.title[0]"
                            @keyup.enter="bill.notes.title[1] = !bill.notes.title[1]"
                        />
                    </div>

                    <div
                        class="mb-30 text-hover"
                        @click="reverseNotes('value', 'notesValue')"
                        v-if="bill.notes.value[1]"
                    >
                        {{ bill.notes.value[0] }}
                    </div>

                    <div v-else class="d-flex space-btw mb-30">
                        <textarea
                            ref="notesValue"
                            class="text-area"
                            v-model="bill.notes.value[0]"
                            @keyup.enter="bill.notes.value[1] = !bill.notes.value[1]"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div class="mt-50 ml-10">
                <div class="d-flex mb-30">
                    <input class="checkBox" type="checkbox" v-model="bill.showSignatures" />
                    <span class="ml-10" @click="bill.showSignatures = !bill.showSignatures"
                        >Laukeliai vardams ir parašams</span
                    >
                </div>

                <div class="d-flex space-btw" v-if="bill.showSignatures">
                    <div>
                        <div
                            class="mb-30 text-hover"
                            @click="reverseProps('seller', 'propSeller')"
                            v-if="bill.props.seller[1]"
                        >
                            {{ bill.props.seller[0] }}
                        </div>

                        <div v-else class="d-flex space-btw mb-30">
                            <input
                                ref="propSeller"
                                type="text"
                                v-model="bill.props.seller[0]"
                                @keyup.enter="bill.props.seller[1] = !bill.props.seller[1]"
                            />
                        </div>

                        <div class="mb-30">
                            <div class="d-flex space-btw" v-if="bill.signatures.seller[1]">
                                <span class="text-hover" @click="reverseSignatures(true)">{{
                                    bill.signatures.seller[0]
                                }}</span>
                            </div>

                            <div v-if="!bill.signatures.seller[1]" class="d-flex">
                                <input
                                    ref="seller"
                                    type="text"
                                    v-model="bill.signatures.seller[0]"
                                    @keyup.enter="bill.signatures.seller[1] = !bill.signatures.seller[1]"
                                />
                            </div>
                        </div>
                        <div class="signatures">
                            <small
                                class="text-hover"
                                v-if="bill.props.sellerSign[1]"
                                @click="reverseProps('sellerSign', 'propSellerSign')"
                            >
                                {{ bill.props.sellerSign[0] }}
                            </small>
                            <div v-else class="d-flex space-btw mb-30">
                                <input
                                    ref="propSellerSign"
                                    type="text"
                                    class="w-400"
                                    v-model="bill.props.sellerSign[0]"
                                    @keyup.enter="bill.props.sellerSign[1] = !bill.props.sellerSign[1]"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            class="mb-30 text-hover"
                            @click="reverseProps('buyer', 'propsBuyer')"
                            v-if="bill.props.buyer[1]"
                        >
                            {{ bill.props.buyer[0] }}
                        </div>

                        <div v-else class="d-flex space-btw mb-30">
                            <input
                                ref="propsBuyer"
                                type="text"
                                v-model="bill.props.buyer[0]"
                                @keyup.enter="bill.props.buyer[1] = !bill.props.buyer[1]"
                            />
                        </div>

                        <div class="mb-30">
                            <div class="d-flex space-btw" v-if="bill.signatures.buyer[1]">
                                <span class="text-hover" @click="reverseSignatures(false)">{{
                                    bill.signatures.buyer[0]
                                }}</span>
                            </div>

                            <div v-if="!bill.signatures.buyer[1]" class="d-flex">
                                <input
                                    ref="buyer"
                                    type="text"
                                    v-model="bill.signatures.buyer[0]"
                                    @keyup.enter="bill.signatures.buyer[1] = !bill.signatures.buyer[1]"
                                />
                            </div>
                        </div>
                        <div class="signatures">
                            <small
                                class="text-hover"
                                v-if="bill.props.buyerSign[1]"
                                @click="reverseProps('buyerSign', 'propBuyerSign')"
                            >
                                {{ bill.props.buyerSign[0] }}
                            </small>
                            <div v-else class="d-flex space-btw mb-30">
                                <input
                                    ref="propBuyerSign"
                                    type="text"
                                    class="w-400"
                                    v-model="bill.props.buyerSign[0]"
                                    @keyup.enter="bill.props.buyerSign[1] = !bill.props.buyerSign[1]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grow1 d-flex space-btw flex-column">
            <GeneratedBill :bill="bill" />

            <div class="generate-button" :class="[buttonActive ? '' : 'inactive']" @click="generateBill">
                <span v-if="buttonActive">Atsisiųsti sąskaitą - PDF</span>
                <span v-else>Šį veiksmą atlikti galėsite po {{ counter }} sekundžių</span>
            </div>
        </div>
    </div>
</template>

<script>
import GeneratedBill from '@/components/GeneratedBill';

export default {
    name: 'Bill',
    components: {
        GeneratedBill
    },
    data: () => {
        return {
            bill: {
                name: ['PVM SĄSKAITA FAKTŪRA', true],
                id: ['Serija: N Nr. 3', true],
                date: ['Data: 2020.02.03', true],
                participants: {
                    seller: ['Pardavėjas', true],
                    buyer: ['Pirkėjas', true]
                },
                seller: [
                    ['Ind. veiklos numeris: 55584587', true],
                    ['Jonas Bulijonas', true],
                    ['Vytauto g. 12, Vilnius, Lietuva', true],
                    ['LT468444888884687', true],
                    ['Swedbank', true]
                ],
                buyer: [
                    ['Ind. veiklos numeris: 888798788', true],
                    ['Tomas Gnomas', true],
                    ['Trakų g. 13, Vilnius, Lietuva', true],
                    ['LT468444888884687', true],
                    ['Seb bankas', true]
                ],
                table: {
                    header: [
                        ['Paslauga', true],
                        ['Matas', true],
                        ['Vienetai', true],
                        ['Kaina', true],
                        ['Suma', true]
                    ],
                    content: [
                        [
                            ['Mokymai "būk žmogus"', true],
                            ['val', true],
                            ['150', true],
                            ['30€', true],
                            ['4500€', true]
                        ]
                    ]
                },
                sum: ['Galutine suma: 4500€', true],
                showSignatures: false,
                showNotes: false,
                notes: {
                    title: ['Pastabos', true],
                    value: ['Pastabos apie esama sąskaitą', true]
                },
                props: {
                    seller: ['Sąskaitą išrašee:', true],
                    sellerSign: ['(pareigos, vardas, pavardė, parašas)', true],
                    buyer: ['Sąskaitą priėmėasd:', true],
                    buyerSign: ['(pareigos, vardas, pavardė, parašas)', true]
                },
                signatures: {
                    seller: ['Jonas Bulijonas', true],
                    buyer: ['Tomas Gnomas', true]
                }
            },
            buttonActive: true,
            counter: 30
        };
    },
    methods: {
        reverseNotes(val, ref) {
            setTimeout(() => {
                this.$refs[ref].focus();
            }, 100);
            return (this.bill.notes[val][1] = !this.bill.notes[val][1]);
        },

        reverseProps(val, ref) {
            setTimeout(() => {
                this.$refs[ref].focus();
            }, 100);
            return (this.bill.props[val][1] = !this.bill.props[val][1]);
        },

        reverseParticipants(first) {
            setTimeout(() => {
                this.$refs[first ? 'participantOne' : 'participantTwo'].focus();
            }, 100);

            return (this.bill.participants[first ? 'seller' : 'buyer'][1] = !this.bill.participants[
                first ? 'seller' : 'buyer'
            ][1]);
        },
        reverseSignatures(seller) {
            setTimeout(() => {
                this.$refs[seller ? 'seller' : 'buyer'].focus();
            }, 100);
            return (this.bill.signatures[seller ? 'seller' : 'buyer'][1] = !this.bill.signatures[
                seller ? 'seller' : 'buyer'
            ][1]);
        },
        reverseValue(name, index) {
            setTimeout(() => {
                if (typeof index === 'number') {
                    this.$refs[name + index].focus();
                } else {
                    this.$refs[name].focus();
                }
            }, 100);

            if (typeof index === 'number') {
                return (this.bill[name][index][1] = !this.bill[name][index][1]);
            } else {
                return (this.bill[name][1] = !this.bill[name][1]);
            }
        },
        reverseValueDouble(first, second, index, indexTwo) {
            setTimeout(() => {
                if (typeof indexTwo === 'number') {
                    this.$refs[first + second + index + indexTwo].focus();
                } else {
                    this.$refs[first + second + index].focus();
                }
            }, 100);

            if (typeof indexTwo === 'number') {
                return (this.bill[first][second][index][indexTwo][1] = !this.bill[first][second][index][indexTwo][1]);
            } else {
                return (this.bill[first][second][index][1] = !this.bill[first][second][index][1]);
            }
        },

        deleteSellerOrBuyer(seller, index) {
            seller ? this.bill.seller.splice(index, 1) : this.bill.buyer.splice(index, 1);
        },
        addSellerOrBuyer(seller) {
            if (seller) {
                this.bill.seller.push(['-', true]);
            } else {
                this.bill.buyer.push(['-', true]);
            }
        },
        addOrDeleteTableHeader(add, index) {
            if (add) {
                this.bill.table.header.push(['-', true]);
                this.bill.table.content.map((x, index) => {
                    this.bill.table.content[index].push(['-', true]);
                });
            } else {
                this.bill.table.header.splice(index, 1);
                this.bill.table.content.map((x, indexTwo) => {
                    this.bill.table.content[indexTwo].splice(index, 1);
                });
            }
        },
        addTableRow() {
            let newRow = [];

            this.bill.table.header.map(() => {
                newRow.push(['-', true]);
            });

            this.bill.table.content.push(newRow);
        },
        deleteTableRow(index) {
            this.bill.table.content.splice(index, 1);
        },
        generateBill() {
            if (this.buttonActive) {
                this.buttonActive = false;

                let timer = () => {
                    if (this.counter > 0) {
                        this.counter--;
                        setTimeout(() => {
                            if (this.counter === 0) {
                                this.buttonActive = true;
                                return (this.counter = 30);
                            }
                            timer();
                        }, 1000);
                    }
                };

                timer();

                return this.callApi();
            }
        },
        async callApi() {
            let billHtml = document.getElementById('bill');
            let setHtml = new URLSearchParams({
                html: billHtml.outerHTML
            });

            let res = await fetch('http://167.99.138.67:3322/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: setHtml
            });

            if (res.status === 200) {
                let blob = await res.blob();

                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'saskaita.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        }
    },
    watch: {
        bill: {
            handler: function(val) {
                let billAsString = JSON.stringify(val);
                localStorage.setItem('bill', billAsString);
            },
            deep: true
        },
        'bill.table.content': {
            handler: function(val) {
                let totalSum = 0;
                val.map(item => {
                    let num = '';
                    for (let i = 0; i < item[item.length - 1][0].length; i++) {
                        let symbol = item[item.length - 1][0][i].replace(',', '.');

                        if (symbol === '.') {
                            num += symbol;
                        } else if (!isNaN(Number(symbol))) {
                            num += symbol;
                        }
                    }
                    totalSum += Number(num);
                });
                this.bill.sum[0] = `Galutinė suma: ${totalSum}€`;
            },
            deep: true
        }
    },
    mounted() {
        if (localStorage.getItem('bill')) {
            this.bill = JSON.parse(localStorage.getItem('bill'));
        }

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getUTCMonth();
        const day = date.getDate();

        this.bill.date[0] = `Data: ${year}.${month + 1}.${day}`;
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/Bill';
</style>
