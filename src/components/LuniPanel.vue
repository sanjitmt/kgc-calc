<template>
    <Panel class="col-12 md:col-6" header="Luniare" :toggleable="true">
        <template #icons>
            <button class="p-panel-header-icon p-link mr-2" @click="editMode = !editMode">
                <span v-if="editMode" class="pi pi-lock-open"></span>
                <span v-else class="pi pi-lock"></span>
            </button>
        </template>
        <div class="grid p-fluid">
            <div class="col-12 pb-0 pt-0">
                <label>Basic</label>
                <div class="col-12 m-0 p-0">
                    <div class="p-inputgroup">
                        <!-- <span class="p-inputgroup-addon ">Level</span> -->
                        <img class="icon " src="level.png" />
                        <div>
                            <InputNumber input-class="white outline" v-model="value.level" mode="decimal" :min="1"
                                :max="20" :readonly="!editMode" />
                            <Slider v-if="editMode" v-model="value.level" :min="1" :max="20" />
                        </div>
                        <img class="icon " src="sword.png" />
                        <div>
                            <InputNumber input-class="red outline" v-model="value.relic.atk" mode="decimal" :min="0"
                                :max="192" :readonly="!editMode" />
                            <Slider v-if="editMode" v-model="value.relic.atk" :min="0" :max="192" />
                        </div>
                        <img class="icon" src="staff.png" />
                        <div>
                            <InputNumber input-class="blue outline" v-model="value.relic.sp" mode="decimal" suffix="%"
                                :min="0" :readonly="!editMode" :max="192" />
                            <Slider v-if="editMode" v-model="value.relic.sp" :min="0" :max="192" />
                        </div>


                    </div>
                </div>
            </div>
            <div v-if="!editMode">
                <div class="col-12 pb-0 pt-0" v-for="index in value.list.length" :key="index">

                    <label class="orange">Luniare {{ index }}</label>
                    <div v-if="!editMode" class="grid p-fluid">
                        <div class="col-12 p-2">
                            <div class="p-inputgroup">
                                <!-- <span class="p-inputgroup-addon ">Tier</span> -->
                                <img class="icon " src="tier.png" />
                                <InputNumber class="w-2" input-class="white outline"
                                    v-model="value.list[index - 1].tier" mode="decimal" :min="1" :max="7"
                                    :showButtons="editMode" :readonly="!editMode" />
                                <img class="icon" src="atk.png" />
                                <InputNumber class="w-2" input-class="red outline" readonly
                                    :model-value="luniAtk(index - 1)" mode="decimal" />
                                <img class="icon" src="sp.png" />
                                <InputNumber class="w-2" input-class="blue outline" readonly
                                    :model-value="luniSp(index - 1)" mode="decimal" />
                                <span class="pr-1 pl-1 w-2 p-inputgroup-addon ">2XBuff</span>
                                <span class="pr-1 pl-1 p-inputgroup-addon ">
                                    <span
                                        :class="['white', 'outline', 'pi', 'w-1rem', value.list[index - 1].db ? 'pi-check' : '']">
                                    </span>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="col-12 pb-0 pt-0" v-for="index in value.list.length" :key="index">
                    <label class="orange pt-2">Luniare {{ index }}</label>

                    <div class="grid p-fluid">
                        <div class="col-10 p-2">
                            <div class="p-inputgroup">
                                <!-- <span class="p-inputgroup-addon ">Tier</span> -->
                                <img class="icon " src="tier.png" />
                                <div>
                                    <InputNumber input-class="white outline" v-model="value.list[index - 1].tier"
                                        mode="decimal" :min="1" :max="7" :readonly="!editMode" />
                                    <Slider v-if="editMode" v-model="value.list[index - 1].tier" :min="1" :max="7" />
                                </div>
                                <span class="pr-1 pl-1 p-inputgroup-addon ">2XBuff</span>
                                <span class="pr-1 pl-1 p-inputgroup-addon ">
                                    <InputSwitch v-if="editMode" v-model="value.list[index - 1].db" />
                                    <span v-else
                                        :class="['white', 'outline', 'pi', value.list[index - 1].db ? 'pi-check' : 'pi-times']">
                                    </span>
                                </span>
                            </div>
                            <div class="p-inputgroup  pt-2 pb-2">
                                <img class="icon" src="Sword4.webp" />
                                <div>
                                    <InputNumber input-class="red outline" v-model="value.list[index - 1].sword"
                                        mode="decimal" :min="0" :max="800" :readonly="!editMode" />
                                    <Slider v-if="editMode" v-model="value.list[index - 1].sword" :min="0" :max="800"
                                        :step="10" />
                                </div>

                                <img class="icon" src="Staff4.webp" />
                                <div>
                                    <InputNumber input-class="blue outline" v-model="value.list[index - 1].staff"
                                        mode="decimal" suffix="%" :min="0" :max="800" :readonly="!editMode" />
                                    <Slider v-if="editMode" v-model="value.list[index - 1].staff" :min="0" :max="800"
                                        :step="10" />
                                </div>

                            </div>
                            <span>Stats</span>
                            <div class="p-inputgroup">
                                <!-- <span class="p-inputgroup-addon">R.ATK</span> -->
                                <img class="icon" src="atk.png" />
                                <InputNumber class="w-4" input-class="red outline" readonly
                                    :model-value="luniAtk(index - 1)" mode="decimal" />
                                <img class="icon" src="sp.png" />
                                <InputNumber class="w-4" input-class="blue outline" readonly
                                    :model-value="luniSp(index - 1)" mode="decimal" />

                            </div>
                        </div>
                        <div class="col-1 m-0 pt-2">
                            <Button v-if="editMode" @click="removeLuni(index - 1)" icon="pi pi-times"
                                class="height-30 p-button p-button-danger"
                                :disabled="index == 1 && value.list.length == 1" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 pb-0 pt-1">
                <div v-if="editMode">
                    <Button class="p-button-success" icon="pi pi-plus" @click="addLuni" />
                    <!-- <Button class="pb-0 pt-0" icon="pi pi-sort-numeric-down-alt" @click="sortLuni" /> -->
                </div>
            </div>

        </div>
        <div class="col-12 mt-1 pt-2 pb-1 border-1 border-yellow-500 border-round-md ">
            <label class="white">Effective Stats</label>
            <div class="col-12 m-0 p-0">
                <div class="p-inputgroup">
                    <!-- <span class="p-inputgroup-addon">R.ATK</span> -->
                    <img class="icon" src="atk.png" />
                    <InputNumber input-class="red outline" readonly :model-value="effectiveLuniAtk()" mode="decimal" />
                    <img class="icon" src="sp.png" />
                    <InputNumber input-class="blue outline" readonly :model-value="effectiveLuniSp()" mode="decimal" />


                </div>
            </div>
        </div>
    </Panel>

</template>
<script>
import { utils } from '../components/helper.js';
// import _isEqual from 'lodash/isEqual'
export default {
    props: {
        initValue: {
            type: Object,
            default() {
                return {
                    level: 16,
                    relic: { sp: 0, atk: 0, spd: 0 },
                    list: [{ tier: 7, staff: 0, sword: 0, bow: 0, db: false }],
                }
            }
        },
        voidStack: {
            type: Number,
            default: 3
        }
    },
    watch: {
        initValue(newValue, oldValue) {
            console.log("luni::initValue::" + JSON.stringify({ newValue, oldValue }));
            this.$data.value = newValue;
            this.$data.editMode = false;

        },
        value: {
            handler() {
                // console.log("+++" + JSON.stringify({ newValue }))
                // console.log("+++" + JSON.stringify({ sp: this.effectiveLuniSp(), atk: this.effectiveLuniAtk() }))
                this.$emit('updateLuniStats', { sp: this.effectiveLuniSp(), atk: this.effectiveLuniAtk(), value: this.value });
            },
            deep: true
        },

    },
    computed: {
    },
    created() {
        this.$emit('updateLuniStats', { sp: this.effectiveLuniSp(), atk: this.effectiveLuniAtk() });
    },
    provide() {
        return {

        }
    },

    data() {
        return {
            editMode: false,
            value: this.initValue
        }
    },
    methods: {
        luniSp(index) {
            var va = this.value;
            var level = va.level;
            var relicSp = va.relic.sp;
            var luni = va.list[index];
            return utils.luniSp(level, relicSp, luni, this.voidStack);
        },
        luniAtk(index) {
            var va = this.value;
            var level = va.level;
            var relicAtk = va.relic.atk;
            var luni = va.list[index];
            return utils.luniAtk(level, relicAtk, luni, this.voidStack);
        },
        addLuni() {
            this.$data.value.list.push({ tier: 5, staff: 0, sword: 0, bow: 0, db: false });
        },
        removeLuni(i) {
            var lsps = this.$data.value.list;
            lsps.splice(i, 1)
        },
        effectiveLuniSp() {
            var level = this.$data.value.level;
            var relicSp = this.$data.value.relic.sp;
            var luniList = this.$data.value.list;
            return utils.effectiveLuniSp(level, relicSp, luniList, this.voidStack);
        },
        effectiveLuniAtk() {
            var level = this.$data.value.level;
            var relicAtk = this.$data.value.relic.atk;
            var luniList = this.$data.value.list;
            return utils.effectiveLuniAtk(level, relicAtk, luniList, this.voidStack);

        }
    }
}
</script>