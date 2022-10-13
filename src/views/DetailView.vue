<template>
  <div>
    <p><input type="text" v-model="keyword"><button>検索</button></p>
    {{ this.$route.params.id }}
    <p>{{ this.$store.state.messe }}</p>
    <p>{{ filterdCountries }}</p>
    <p>{{ filterdCountries }}</p>

    <ul v-for="SearchedCountry in filterdCountries2" :key="SearchedCountry.id">
      <li @click="detail(SearchedCountry.ja_name)" class="hover:bg-gray-300">
        <span class="text-5xl"><flag :iso="SearchedCountry.alpha2" class='mb-10 rounded-full' /></span>
          {{ SearchedCountry.ja_name }}
      </li>
    </ul>


  </div>
</template>

<script>
import countries from '@/country'

export default {
  data() {
    return {
      countriesData: countries,
      aaa: 0,
      keyword: '',
    }
  },
  computed: {
    filterdCountries() {
      const a = [];

      for( let i = 0; i < this.countriesData.length; i++) {
        
        const b = this.countriesData[i]

        if (b.ja_name === this.$store.state.messe) {
          a.push(b);
      }
    }
    return a;
    },
    filterdCountries2() {
      if(this.keyword) {
        const a = [];

        for( let i = 0; i < this.countriesData.length; i++) {
          
          const b = this.countriesData[i]

          if (b.ja_name.indexOf(this.keyword) !== -1) {
            a.push(b);
        }
      }
      return a;
      } else {
        return 'ここにが入るよ'
      }
    }
  },
  methods: {
    detail(n) {
      //console.log(n)
      this.$store.commit('detail', n)
    }
    //クリックしたら数字取得してミューテーションに飛ばす
  }
}
</script>