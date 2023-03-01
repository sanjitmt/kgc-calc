<template>
  <TabMenu :model="items" />
  <div class="pt-1">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.p-panel .p-panel-header .p-togglebutton.p-button.p-highlight {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px #ffe284;
  border-color: #FFD54F;
}

.p-panel-header {
  height: 30px;
}

/* .p-button-icon-only {
  height: 24px;
  border: 0px;
  justify-content: center;
  align-items: center;
} */

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  padding: 6px;
}

.p-inputnumber {
  height: 30px;
}

/* .p-inputnumber-button {
  height: 15px;
} */

.height-30 {
  height: 30px;
}

.white {
  font-weight: bold;
  color: whitesmoke;
}
.lgreen {
  font-weight: bold;
  color: rgb(47, 238, 50);
}
.about {
  color: grey;
}

.red {
  font-weight: bold;
  color: firebrick;
}

.orange {
  font-weight: bold;
  color: orange
}

.green {
  font-weight: bold;
  color: green
}

.blue {
  font-weight: bold;
  color: royalblue
}

.outline {
  /* font-family: "Comic Sans MS", "Comic Sans", cursive; */
  font-weight: 900;
  text-shadow: #AAAAAA 0px 0px 1px;
  -webkit-font-smoothing: antialiased;
}

/* nav {
  text-align: center;
  padding: 0.5rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
<script>
export default {
  data() {
    return {
      items: [
        { label: 'Home', to: "/" },
        // { label: 'Hero', to: "/hero" },
        { label: 'Damage Calculator', to: "/dps" },
        // { label: 'About', to: "/about" },
      ]
    }
  }
}
</script>