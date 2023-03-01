<template>
  <div>
    <Toast />

    <!-- <input type="file" ref="file" style="display: none" />
    <button @click="$refs.file.click()">open file dialog</button> -->
    <div class="grid p-fluid">
      <Panel class="col-12 " header="Basic" :toggleable="true">
        <template #icons>
          <!-- <Button class="p-panel-header-icon " icon="pi pi-link" @click="copyUrl()" /> -->
          <ToggleButton v-for="index in this.numberOfSlot" :key="index" class="p-panel-header-icon text-xs"
            :on-label="`${index}`" :off-label="`${index}`" :model-value="index == this.slot"
            @change="this.slot = index" />

          <button class="p-panel-header-icon p-link mr-2" @click="configEditMode = !configEditMode">
            <span v-if="configEditMode" class="pi pi-lock-open"></span>
            <span v-else class="pi pi-lock"></span>
          </button>
          <button class="p-panel-header-icon p-link mr-2" @click="toggle">
            <span class="pi pi-cog"></span>
          </button>
          <Menu id="configMenu" ref="menu1" :model="basicMenuItems" :popup="true" />

        </template>
        <div class="grid p-fluid">
          <div class="col-12 pb-0 pt-2">
            <div class="col-12 m-0 p-0">
              <div class="p-inputgroup">
                <img class="p-inputgroup-addon icon" src="RVoid.webp" />
                <div>
                  <InputNumber class="while outline" v-model="dpsState.voidStack" :min="0" :max="5"
                    :readonly="!configEditMode" />
                  <Slider v-if="configEditMode" v-model="dpsState.voidStack" :min="0" :max="5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel class="col-12 md:col-6" header="Carry" :toggleable="true">
        <template #header>
          <div class="grid p-fluid m-1">
            <span class="white text-bold">Carry</span>
            <Dropdown v-if="carryEditMode" class="ml-2" :disabled="!carryEditMode" v-model="dpsState.selectedCarry"
              :options="carries" optionLabel="name" />
            <span v-else class="pl-2 orange"> {{ dpsState.selectedCarry.name }}</span>

          </div>
        </template>
        <template #icons>
          <button class="p-panel-header-icon p-link mr-2" @click="carryEditMode = !carryEditMode">
            <span v-if="carryEditMode" class="pi pi-lock-open"></span>
            <span v-else class="pi pi-lock"></span>
          </button>
        </template>

        <div class="grid p-fluid">
          <div class="col-12 pb-0 pt-2">
            <div class="col-12 m-0 p-0">
              <div class="p-inputgroup">
                <!-- <span class="p-inputgroup-addon ">Level</span> -->
                <img class="icon " src="level.png" />
                <div>
                  <InputNumber class="" input-class="white outline" v-model="dpsState.carry.level" mode="decimal"
                    :min="1" :max="20" :readonly="!carryEditMode" />
                  <Slider v-if="carryEditMode" v-model="dpsState.carry.level" :min="1" :max="20" />
                </div>
                <!-- <span class="p-inputgroup-addon ">Tier</span> -->
                <img class="icon " src="tier.png" />
                <div>
                  <InputNumber class="" input-class="white outline" v-model="dpsState.carry.tier" mode="decimal"
                    :min="1" :max="7" :readonly="!carryEditMode" />
                  <Slider v-if="carryEditMode" v-model="dpsState.carry.tier" :min="1" :max="7" />
                </div>
              </div>

              <div v-if="carryEditMode" class="p-inputgroup pt-3">
                <!-- <span class="p-inputgroup-addon">R.ATK</span> -->
                <img class="icon " src="sword.png" />
                <div>
                  <InputNumber class="" input-class="red outline" v-model="dpsState.carry.relic.atk" mode="decimal"
                    :min="0" :max="192" :readonly="!carryEditMode" />
                  <Slider v-model="dpsState.carry.relic.atk" :min="0" :max="192" />
                </div>
                <img class="icon" src="staff.png" />
                <div>
                  <InputNumber class="" input-class="blue outline" v-model="dpsState.carry.relic.sp" mode="decimal"
                    suffix="%" :min="0" :max="192" :readonly="!carryEditMode" />
                  <Slider v-model="dpsState.carry.relic.sp" :min="0" :max="192" />
                </div>
                <img class="icon" src="bow.png" />
                <div>
                  <InputNumber class="" input-class="green outline" v-model="dpsState.carry.relic.spd" mode="decimal"
                    suffix="%" :min="0" :max="192" :readonly="!carryEditMode" />
                  <Slider v-model="dpsState.carry.relic.spd" :min="0" :max="192" />
                </div>
              </div>
              <div v-if="carryEditMode" class="p-inputgroup pt-3">
                <img class="icon" src="Sword4.webp" />
                <div>
                  <InputNumber class="" input-class="red outline" v-model="dpsState.carry.items.sword" mode="decimal"
                    :min="0" :max="800" :readonly="!carryEditMode" />
                  <Slider v-model="dpsState.carry.items.sword" :min="0" :max="800" :step="10" />
                </div>
                <img class="icon" src="Staff4.webp" />
                <div>
                  <InputNumber class="" input-class="blue outline" v-model="dpsState.carry.items.staff" mode="decimal"
                    suffix="%" :min="0" :max="800" :readonly="!carryEditMode" />
                  <Slider v-model="dpsState.carry.items.staff" :min="0" :max="800" :step="10" />
                </div>
                <img class="icon" src="Bow4.webp" />
                <div>
                  <InputNumber class="" input-class="green outline" v-model="dpsState.carry.items.bow" mode="decimal"
                    suffix="%" :min="0" :max="800" :readonly="!carryEditMode" />
                  <Slider v-model="dpsState.carry.items.bow" :min="0" :max="800" :step="10" />
                </div>
              </div>
              <div :class="`p-inputgroup ${carryEditMode ? 'pt-3 pb-3' : ''}`">
                <span class="pl-3 pr-3 outline orange p-inputgroup-addon">+1</span>
                <div>
                  <InputNumber class="" input-class="white outline" v-model="dpsState.carry.items.p1" mode="decimal"
                    :min="0" :max="3 - dpsState.carry.items.m3" :readonly="!carryEditMode" :show-buttons="carryEditMode"
                    buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                  <!-- <Slider v-model="dpsState.carry.items.p1" :min="0" :max="3 - dpsState.carry.items.m3" /> -->
                </div>
                <span class="pl-3 pr-3 outline orange p-inputgroup-addon">X3</span>
                <div>
                  <InputNumber class="" input-class="white outline" v-model="dpsState.carry.items.m3" mode="decimal"
                    :min="0" :max="3 - dpsState.carry.items.p1" :readonly="!carryEditMode" :show-buttons="carryEditMode"
                    buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                  <!-- <Slider v-model="dpsState.carry.items.m3" :min="0" :max="3 - dpsState.carry.items.p1" /> -->
                </div>
              </div>
              <div class="p-1 m-1 border-primary border-1 border-yellow-500 border-round-md">
                <span>Stats</span>
                <div class="p-inputgroup">
                  <!-- <span class="p-inputgroup-addon">R.ATK</span> -->
                  <img class="icon" src="atk.png" />
                  <InputNumber class="w-4" input-class="red outline" readonly :model-value="carryAtk()"
                    mode="decimal" />
                  <img class="icon" src="sp.png" />
                  <InputNumber class="w-4" input-class="blue outline" readonly :model-value="carrySp()"
                    mode="decimal" />
                  <img class="icon" src="aspd.png" />
                  <InputNumber class="w-4" input-class="green outline" readonly :model-value="carrySpd()"
                    mode="decimal" />
                </div>
                <span>Buffed Stats</span>
                <div class="p-inputgroup">
                  <!-- <span class="p-inputgroup-addon">R.ATK</span> -->
                  <img class="icon" src="atk.png" />
                  <InputNumber class="w-4" input-class="red outline" readonly :model-value="buffedAtk" mode="decimal" />
                  <img class="icon" src="sp.png" />
                  <InputNumber class="w-4" input-class="blue outline" readonly :model-value="buffedSp" mode="decimal" />
                  <img class="icon" src="aspd.png" />
                  <InputNumber class="w-4" input-class="green outline" readonly :model-value="carrySpd()"
                    mode="decimal" />
                </div>
                <span>Damage Stats</span>
                <div v-if="!skills || skills.length == 0"><span class="p-1">Nothing to show here...</span></div>
                <div v-for="[key, skill] in skills" :key="key">
                  <div class="grid p-fluid">
                    <div class="col-12">
                      <span class="col-12 text-xs font-bold whit pl-1">{{ skill.name }}</span>
                      <!-- <div class="p-inputgroup">
                        <span class="w-6 pl-2 p-1 text-xs whit p-inputgroup-addon">Value</span>
                        <InputNumber class="" :input-class="`${this.typeColor(skill.type)} outline`" readonly
                          :model-value="skill.dpsValue" mode="decimal" />
                        <span class="w-3 p-1 text-xs whit p-inputgroup-addon">{{ skill.unit }}</span>
                      </div> -->
                      <div v-for="(stat, index) in skill.items" :key="index" class="p-inputgroup">
                        <span class="col-5 pl-2 p-1 text-xs whit white-space-nowrap overflow-hidden text-overflow-clip p-inputgroup-addon">{{ stat.name }}</span>
                        <InputNumber class="" :input-class="`${stat.color} outline`" readonly
                          :model-value="stat.value(this.stats())" mode="decimal" />
                        <span class="col-2 p-1 text-xs whit p-inputgroup-addon">{{ `${stat.unit}`}}</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Panel>
      <LuniPanel :void-stack="dpsState.voidStack" :init-value="luniValue" @update-luni-stats="updateLuniValues" />
    </div>
  </div>
</template>
<style>
.kgcmin {
  height: min-content;
}

/* .p-panel.p-panel-toggleable .p-panel-header {
  padding-left: 8px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 8px;
} */

.icon {
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
  border: 1px;
  /* align-items: stretch;
  justify-items: stretch; */
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.p-inputgroup-addon {
  padding: 0rem;
  min-width: 1rem;
}

.p-panel .p-panel-content {
  padding: 0.5rem;
}

.p-inputtext {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 5px;
  padding-right: 5px;
}

.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button {
  width: 1.5rem;
}

.p-button.p-button-icon-only {
  padding: 0.4rem;
  width: 2rem;
}
</style>
<script>
import { utils, table } from './helper.js';

import LuniPanel from './LuniPanel.vue';

export default {
  components: {
    LuniPanel
  },
  data() {
    return {
      numberOfSlot: 5,
      slot: this.slot,
      carryEditMode: false,
      configEditMode: false,
      // effectiveLuniSp: 0,
      // effectiveLuniAtk: 0,
      dpsState: {
        voidStack: 5,
        carry: {
          relic: { sp: 0, atk: 0, spd: 0 },
          items: { staff: 0, sword: 0, bow: 0, p1: 0, m3: 0, c2: 0 },
          level: 16,
          tier: 5,
        },
        selectedCarry: { name: 'Mel', code: 'mel' },
      },
      luniValue: {
        level: 16,
        relic: { sp: 0, atk: 0, spd: 0 },
        list: [{ tier: 7, staff: 0, sword: 0, bow: 0, db: false }],
      },
      carries: table.carries,
      basicMenuItems: [
        {
          label: 'Copy Config',
          command: () => {
            this.copyConfig();
            this.$toast.add({ severity: 'success', summary: 'Copied', detail: 'Config copied to clipboard !', life: 3000 });
          }
        },
        {
          label: 'Copy Url',
          command: () => {
            this.copyUrl();
            this.$toast.add({ severity: 'success', summary: 'Copied', detail: 'URL copied to clipboard !', life: 3000 });
          }
        },
        {
          label: 'Save to...',
          items: [...[1, 2, 3, 4, 5].map(x => {
            return {
              label: `${x}`,
              command: () => {
                this.saveSlot(x);
              },
            }
          })]
        }


      ]
    }
  },
  computed: {
    skills() {
      var skills = table.skills[this.$data.dpsState.selectedCarry.code];
      console.log("skills:"+JSON.stringify(Object.entries(skills)));
      return Object.entries(skills);
    },
    buffedAtk() {
      var carryAtk = this.carryAtk();
      var hero = this.$data.dpsState.selectedCarry.code;
      return utils.buffedByLuniAtk(hero, carryAtk, this.effectiveLuniAtk());
    },
    buffedSp() {
      var carrySp = this.carrySp();
      var hero = this.$data.dpsState.selectedCarry.code;
      console.log("carrySp:" + carrySp);
      return utils.buffedByLuniSp(hero, carrySp, this.effectiveLuniSp());
    }
  },
  watch: {
    slot(newValue, oldValue) {
      console.log("slot::: old:" + oldValue + "---new:" + newValue);
      if (oldValue != null) this.saveSlot(oldValue);
      if (newValue != null) this.loadSlot(newValue);
    },
    dpsState: {
      handler() {
        console.log("dpsState Changed!")
        this.saveSlot(this.$data.slot);
      },
      deep: true,
    }

  },
  mounted() {
    if ('config' in this.$route.query) {
      console.log("query::" + JSON.stringify(this.$route.query));
      var config = JSON.parse(decodeURIComponent(this.$route.query.config));
      this.$data.slot = -1;
      this.$data.dpsState = config.dpsState;
      this.$data.luniValue = config.luniValue;
      this.$router.replace({ 'query': null });
    } else {

      this.printStorage();
      this.slot = localStorage.getItem('slot');
      console.log("slot--:" + this.slot);
      if (this.slot == null) {
        console.log("init slot 1");
        this.initSlot(1);
        this.slot = 1;
        this.loadSlot(1);
      }
      this.printStorage();
    }
    //console.log("slot:" + localStorage.getItem('slot'));
  },
  create() {

  },

  methods: {
    // stats(tier, atk, sp, aspd, p1, m3, c2) {
    //   return { tier: tier, atk: atk, sp: sp, aspd: aspd, p1, m3, c2 };
    // },
    // dps(index) {
    //   console.log(">>" + index)
    //   console.log(">>" + this.$data.dpsState.selectedCarry.code);
    //   console.log(">>" + table.skills[this.$data.dpsState.selectedCarry.code]);
    //   let skill = table.skills[this.$data.dpsState.selectedCarry.code][index].dps;
    //   return skill(this.$data.dpsState.carry.tier, this.buffedAtk, this.buffedSp, this.carrySpd());
    // },
    stats() {
      var p1 = this.$data.dpsState.carry.items.p1;
      var m3 = this.$data.dpsState.carry.items.m3;
      var c2 = this.$data.dpsState.carry.items.c2;
      var tier = this.$data.dpsState.carry.tier;
      var atk = this.buffedAtk;
      var sp = this.buffedSp;
      var aspd = this.carrySpd();
      return { tier, atk, sp, aspd, p1, m3, c2 };
    },
    copyUrl() {
      var url = document.location.origin
      var path = this.$route.path
      var queryString = "config=" + encodeURIComponent(this.createConfig());
      return navigator.clipboard.writeText(`${url}/#${path}?${queryString}`);

    },
    createConfig() {
      var dpsState = this.$data.dpsState;
      var luniValue = this.$data.luniValue;
      return `${JSON.stringify({ dpsState, luniValue })}`;
    },
    copyConfig() {
      return navigator.clipboard.writeText(this.createConfig());

    },
    heroSp(name, level, tier, relic, staff) {
      return utils.heroSp(name, level, tier, relic, staff)
    },

    carrySp() {
      var state = this.$data.dpsState;
      var rTier = state.carry.tier;
      var rLvl = state.carry.level;
      var rr = state.carry.relic.sp;
      var rStaff = state.carry.items.staff;
      var hero = state.selectedCarry.code;
      var voidStack = state.voidStack;
      return utils.heroSp(hero, rLvl, rTier, rr, rStaff, voidStack);
    },
    carryAtk() {
      var state = this.$data.dpsState;
      var rTier = state.carry.tier;
      var rLvl = state.carry.level;
      var rr = state.carry.relic.atk;
      var rSword = state.carry.items.sword;
      var hero = state.selectedCarry.code;
      var voidStack = state.voidStack;
      return utils.heroAtk(hero, rLvl, rTier, rr, rSword, voidStack);
    },
    carrySpd() {
      var state = this.$data.dpsState;
      var rTier = state.carry.tier;
      var rLvl = state.carry.level;
      var rr = state.carry.relic.spd;
      var rBow = state.carry.items.bow;
      var hero = state.selectedCarry.code;
      return utils.heroSpd(hero, rLvl, rTier, rr, rBow);
    },
    updateLuniValues(values) {
      var { sp, atk, value } = values;
      // console.log("+++>" + JSON.stringify(values))
      // this.effectiveLuniSp = sp;
      // this.effectiveLuniAtk = atk;
      this.luniValue = value;
      console.log("updateBuffedSats+++>2" + JSON.stringify({ sp, atk, value }));

    },
    printStorage() {
      console.log("printStorage")
      for (var i = 1; i <= localStorage.length; i++) {
        var key = localStorage.key(`${i}`);
        var item = localStorage.getItem(key);
        console.log(key + "-==-" + item);
      }
      console.log("end printStorage")
    },

    initSlot(index) {
      console.log(`initSlot(${index})`)
      localStorage.setItem('slot', `${index}`);
      localStorage.setItem(`slot_dpsState_${index}`, JSON.stringify({
        dpsState: {
          voidStack: 5,
          carry: {
            relic: { sp: 0, atk: 0, spd: 0 },
            items: { staff: 0, sword: 0, bow: 0, p1: 0, m3: 0, c2: 0 },
            level: 16,
            tier: 5,
          },
          selectedCarry: { name: 'Mel', code: 'mel' },
        },
        luniValue: {
          level: 16,
          relic: { sp: 0, atk: 0, spd: 0 },
          list: [{ tier: 7, staff: 0, sword: 0, bow: 0, db: false }],
        }
      }));
    },
    saveSlot(index) {
      localStorage.setItem(`slot_dpsState_${index}`, JSON.stringify({
        dpsState: this.$data.dpsState,
        luniValue: this.luniValue,
      }));

    },
    loadSlot(index) {
      localStorage.setItem('slot', `${index}`);
      this.$data.carryEditMode = false;
      this.$data.configEditMode = false;
      console.log(`loadSlot(${index})`)
      var storedJsonString = localStorage.getItem(`slot_dpsState_${index}`);
      if (storedJsonString == null) {
        this.initSlot(index);
        storedJsonString = localStorage.getItem(`slot_dpsState_${index}`);
      }
      var storedValue = JSON.parse(storedJsonString);
      console.log("loaded:" + JSON.stringify(storedValue));
      this.$data.dpsState = storedValue.dpsState;
      this.$data.luniValue = storedValue.luniValue;
    },
    effectiveLuniAtk() {
      var level = this.$data.luniValue.level;
      var relicAtk = this.$data.luniValue.relic.atk;
      var luniList = this.$data.luniValue.list;
      return utils.effectiveLuniAtk(level, relicAtk, luniList, this.dpsState.voidStack)
    },
    effectiveLuniSp() {
      var level = this.$data.luniValue.level;
      var relicSp = this.$data.luniValue.relic.sp;
      var luniList = this.$data.luniValue.list;
      return utils.effectiveLuniSp(level, relicSp, luniList, this.dpsState.voidStack);
    },
    typeColor(type) {
      switch (type) {
        case 'ATK':
          return 'orange';
        case 'SP':
          return 'blue';
        case 'HEAL':
          return 'lgreen';
        default:
          return 'white';
      }
    },
    toggle(event) {
      console.log(JSON.stringify(this.$refs))
      this.$refs.menu1.toggle(event);
    },
    saveFile() {

    }
    // dps() {
    //   return Math.round(this.buffedAtk / this.carrySpd());

    // }

  }
}
</script>

