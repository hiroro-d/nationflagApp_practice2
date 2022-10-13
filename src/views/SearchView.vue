<template>
  <div>
    <button v-show="btnActive" @click="pageTop" class="fixed right-5 bottom-10 bg-gray-900 opacity-70 rounded-2xl p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" fill-opacity="0.5" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
        <path class="w-20" fill-rule="nonzero" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
      </svg>
    </button>

    <div class="m-10 border-2 border-black p-5 bg-blue-200">
      <p class="mb-4">けんさく<input type="text" v-model="keyword" placeholder=" ここに国の名前をかいてね" class="ml-5"></p>
          <div class="w-auto h-20 leading-8 mb-10">
            <p><span>国の名前：</span>{{ filterdCountries2[0].ja_name }}</p>
            <p><span>英名は？：</span>{{ filterdCountries2[0].en_name }}</p>
            <p><span>場所は？：</span>{{ filterdCountries2[0].location }}</p>
          </div>

      <ul v-for="SearchedCountry in filterdCountries" :key="SearchedCountry.id">
        <li @click="detail(SearchedCountry.ja_name)" class="hover:bg-gray-300 cursor-pointer flex items-center my-5 gap-5">
          <span class="text-5xl">
            <flag :iso="SearchedCountry.alpha2" class=' rounded-md' />
            </span>
            <span class="">{{ SearchedCountry.ja_name }} ←クリック</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import countries from '@/country'

export default {
  data() {
    return {
      btnActive: false,
      scroll: 0,
      countriesData: countries,
      keyword: '',
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollWindow)
  },
  computed: {
    filterdCountries() {
      const a = [];

      for( let i = 0; i < this.countriesData.length; i++) {
        
        const b = this.countriesData[i]

        if (b.ja_name.indexOf(this.keyword) !== -1) {
          a.push(b);
      }
    }
    return a;
    },
    filterdCountries2() {
      if(this.keyword || this.$store.state.messe) {
        const a = [];

        for( let i = 0; i < this.countriesData.length; i++) {
          
          const b = this.countriesData[i]

          if (b.ja_name === this.$store.state.messe) {
            a.push(b);
          }
        }
        return a;
      } else {
        return '(/・ω・)/'
      }
    },
  },
  methods: {
    pageTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    scrollWindow() {
      const top = 100;
      this.scroll = window.scrollY;
      if (top <= this.scroll) {
        this.btnActive = true;
      } else {
        this.btnActive = false;
      }
    },

    detail(n) {
      //console.log(n)
      this.$store.commit('detail', n)
      this.pageTop()
    }
    //クリックしたら数字取得してミューテーションに飛ばす
  }
}

//インプットをv-modelでkeywordに入れる。
//keywordを元にcountriesDataをフィルタリングし、filteredに入れる。
//filteredに入れた国をv-forで表示する。

//国名をクリック→詳細ページを表示
//ルーターリンクで飛ばす→飛んだ先はクリックした国名の情報をcomputedに渡して表示
//クリックした国のnumericを取得、その数字をvuexの変数に入れる、詳細ページでその変数を取り出す、
//その変数の国の詳細を表示する
</script>

