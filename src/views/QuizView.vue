<template>
  <div>
    <h2 class="mb-10">国旗クイズ 5問連続 正解した国の情報は記録されていく形にしたい</h2>
    <p><button @click="randomSelectIn" class="border border-">問題を国旗で出す</button></p>
    <span class="text-9xl"><flag class="mb-10 w-60" :iso="questionCountryName"/></span>
    <ul>
      <li v-for="(country, index) in selectedCountries" :key="country.id">
        <input type="radio" name="question" :id="'choose' + index" v-model="userChose" :value="index">
          <label :for="'choose' + index">  {{ country.ja_name }}</label>
      </li>
    </ul>
    <button @click="answer">答え</button>
    <p v-show="correct">正解！<span>{{ aiueo }}</span></p>
    <p v-show="incorrect" >残念！不正解（＾ω＾）<button>もう一度チャレンジ</button></p>
    <hr>
    <hr>
    <div id="seikaisitabun" class="relative">
      <flag :iso="kakaka" class='mb-10 rounded-full' />
    </div>
  </div>
</template>

<script>
import countries from '@/country'

//正解した時は、その国の情報を取得、不正解は無視。

export default {
  components: {
  },
  data() {
    return {
      countriesData: countries,
      selectedCountries: '',
      userChose: 0,
      flagActive: false,
      questionCountryName: '',
      questionCountryNameIndex: 0,
      correct: false,
      incorrect: false,
      aiueo: [],
      kakikukeko: [],
      kakaka: '',
      aaaaa: ''
    }
  },
  methods: {
    answer() {
      if ( this.userChose === this.questionCountryNameIndex ) {
        this.correct = true; //v-showの表示
        this.incorrect = false;

        this.aiueo.push(this.questionCountryName) //ローカルストレージに入れる
        localStorage.setItem('seikaiKokki', JSON.stringify(this.aiueo))
        this.aiueo = []

        const data = localStorage.getItem('seikaiKokki') //ローカルストレージから取り出す
        if (data) {
          this.kakikukeko = JSON.parse(data);
          for (let j = 0; j < this.kakikukeko.length; j++) {
            this.kakaka = this.kakikukeko[j];
          }
        } else {
          this.kakikukeko = []
        }


      } else {
        this.correct = false;
        this.incorrect = true
      }
    },
    randomSelect(countriesData, num) { //newArrayにランダムのオブジェクトを入れるだけの関数
      let newArray = [];
      
      while(newArray.length < num && countriesData.length > 0) {
        const rand = Math.floor(Math.random() * countriesData.length)
        newArray.push(countriesData[rand])
        countriesData.splice(rand, 1)
      }
      return newArray;
    },
    randomSelectIn() { //randomSelectを３回に指定して、得たnewArrayをselectedCountriesに入れる関数。imgも。
      this.selectedCountries = this.randomSelect(this.countriesData.slice(), 3);
      this.question();
    },
    question() { //選んだ３つの国からランダムに１つ選んで、その国の名前をquestionContryNameに入れる関数
      const rand2 = Math.floor(Math.random() * this.selectedCountries.length);
      this.aaaaa = this.selectedCountries[rand2]
      this.questionCountryNameIndex = this.selectedCountries.indexOf(this.selectedCountries[rand2]);
      this.questionCountryName = this.selectedCountries[rand2].alpha2;
    }
  }
}

//質問したこと
//v-forの回数指定。
//ラジオボタンの特性（valueがいる）
//配列の中のオブジェクトをランダムで、３つ選ぶ方法
//indexOfの使い方

</script>