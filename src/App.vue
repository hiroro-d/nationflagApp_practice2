<template>
  <div id="app" class="container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/QuizView">QuizView</router-link> |
      <router-link to="/SearchView">SearchView</router-link> |
    </nav>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>