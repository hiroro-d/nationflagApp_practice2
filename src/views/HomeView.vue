<template>
  <div class="home text-center">
    <div id="ttl" class="mt-10 bg-pink-100 w-96 m-auto rounded-full">
      <p><img src="@/assets/logo.svg" alt="" class="m-auto"></p>
    </div>
        <router-link to="/QuizView">
              <p><button class="m-10"><img src="@/assets/kuizu.png" alt=""></button></p>
        </router-link>

        <router-link to="/SearchView">
          <button><img src="@/assets/kensaku.png" alt=""></button>
        </router-link>
      
  </div>
</template>

<script>
export default {

}
</script>