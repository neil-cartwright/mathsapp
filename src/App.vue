<template>
  <div id="app">
    <nav
      class="navbar has-background-light noPrint"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
        <div class="navbar-item">
          <router-link to="/">Maths</router-link>
        </div>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu is-active">
        <!-- navbar start, navbar end -->
        <div class="navbar-end">
          <router-link class="navbar-item" to="/print-sums"
            >Print Sums</router-link
          >
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="columns">
        <div class="column is-12">
          <router-view />
        </div>
      </div>
    </section>
  </div>
</template>
