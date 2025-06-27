<template>
  <div id="app" class="framework7-root">
    <div class="view view-main view-init safe-areas">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Safe Areas Support */
.safe-areas {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

/* Ensure full height */
#app {
  height: 100vh;
  width: 100vw;
}

.framework7-root {
  height: 100%;
  width: 100%;
}

.view-main {
  height: 100%;
}

/* Additional safe area utilities */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-left {
  padding-left: env(safe-area-inset-left);
}

.safe-area-right {
  padding-right: env(safe-area-inset-right);
}

/* For status bar overlay on iOS */
.statusbar-overlay {
  background: var(--f7-bars-bg-color);
}

/* Navbar safe area adjustments */
.navbar {
  padding-top: env(safe-area-inset-top);
}

/* Toolbar safe area adjustments */
.toolbar {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Page content safe area adjustments */
.page-content {
  padding-bottom: calc(env(safe-area-inset-bottom) + var(--f7-page-content-extra-padding-bottom, 0px));
}
</style>
