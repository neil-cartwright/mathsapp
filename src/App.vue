<template>
  <div id="app">
    <nav
      class="navbar has-background-light noPrint is-hidden"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <!-- navbar items, navbar burger... -->
          <div class="navbar-item app-title">
            <router-link
              to="/"
              class="title is-size-4 has-text-success has-font-quicksand"
            >Maths App</router-link>
          </div>

          <a
            role="button"
            class="navbar-burger burger is-hidden"
            aria-label="menu"
            aria-expanded="false"
            data-target="nav"
            @click="toggleMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active': isActive }">
          <!-- navbar start, navbar end -->
          <div class="navbar-end">
            <router-link class="navbar-item is-hidden" to="/print-sums">Print Random Sums</router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="columns">
        <div class="column is-12">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
<script>
export default {
  data: function() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleMenu: function() {
      return (this.isActive = !this.isActive);
    }
  }
};
</script>
