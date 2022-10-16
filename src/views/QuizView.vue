<template>
  <div>
    <h2 class="mb-1">国旗クイズ 5問連続 正解した国の情報は記録されていく形にしたい</h2>
    <div v-show="qActive" class="flex flex-col items-center">



      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
                <div v-show="countriesData">
                  <h2 class="card-title">{{ qTtl }}</h2>
                  <p>{{ qTtlSub }}</p>
                  <div class="card-actions justify-end">
                    <button @click="randomSelectIn" v-show='qTtlSub' class="btn btn-primary mt-5">クイズをはじめる</button>
                  </div>
                </div>

            <ul class="steps">
              <li v-show="correct1 === false" class="step"></li>
              <li :class="{step:correct1, 'step-primary':correct1}"></li>
              <li :class="{step:correct2, 'step-primary':correct2}"></li>
              <li :class="{step:correct3, 'step-primary':correct3}"></li>
              <li :class="{step:correct4, 'step-primary':correct4}"></li>
              <li :class="{step:correct5, 'step-primary':correct5}"></li>
            </ul>
        </div>
      </div>




    </div>
   

    <div class="flex p-10">



      <span class="text-9xl"><flag class="mb-10 w-60" :iso="questionCountryName"/></span>
      <p v-show="questionCountryName" class="p-10">ヒント {{ questionCountryName }}</p>



      <div class="avatar" v-show="checkA">
        <div class="w-24 mask mask-squircle">
          <span class="text-9xl"><flag class="mb-10 w-60" :iso="erandakuni"/></span>
        </div>
      </div>
    </div>

             <p v-show="checkA" class="btn btn-secondary absolute left-44 top-80">{{ checkA }}</p>
    
    <ul v-show="selectedCountries[0].ja_name" class="flex flex-col px-10 bottom-1">
      <li @click="qActive1(selectedCountries[0].ja_name)" class="w-full btn text-xl mb-10">
        <input type="checkbox" name="question1" v-model="userChose1" class="hidden">
           {{ selectedCountries[0].ja_name }}
      </li>
      <li @click="qActive2(selectedCountries[1].ja_name)" class="w-full btn text-xl mb-10">
        <input type="checkbox" name="question2" v-model="userChose2" class="hidden">
           {{ selectedCountries[1].ja_name }}
      </li>
      <li @click="qActive3(selectedCountries[2].ja_name)" class="w-full btn text-xl mb-10">
        <input type="checkbox" name="question3" v-model="userChose3" class="hidden">
           {{ selectedCountries[2].ja_name }}
      </li>
    </ul>
  


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

      qTtl: 'こっきクイズだよ！',
      qTtlSub: 'ぜんぶで５つ。いくつわかるかな？？(*‘∀‘)',

      correct1: false,
      correct2: false,
      correct3: false,
      correct4: false,
      correct5: false,

      seikaiCount: 0,
      erandakuni: '',


      selectedCountries: 'aiu',
      qActive: true,
      userChose1: false, //選んだ答え
      userChose2: false, //選んだ答え
      userChose3: false, //選んだ答え
      flagActive: false,
      questionCountryName: '',
      questionCountryNameIndex: 0,
      correct: false,
      incorrect: false,
      aiueo: [],
      kakikukeko: [],
      kakaka: '',
      kuni: '', //正解の国のアルファ2
      checkA: ''
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
      this.qTtl = 'がんばって！'
      this.qTtlSub = ''
    },
    question() { //選んだ３つの国からランダムに１つ選んで、その国の名前をquestionContryNameに入れる関数
      const rand2 = Math.floor(Math.random() * this.selectedCountries.length);
      this.kuni = this.selectedCountries[rand2].ja_name
      this.questionCountryNameIndex = this.selectedCountries.indexOf(this.selectedCountries[rand2]);
      this.questionCountryName = this.selectedCountries[rand2].alpha2;
    },
    qActive1(sc0) {
      this.userChose1 = !this.userChose1
      this.erandakuni = this.selectedCountries[0].alpha2

      if(sc0 === this.kuni) {
        this.checkA = '正解(∩´∀｀)'

        this.seikaiCount++
        if(this.seikaiCount === 1) {
          this.correct1 = true
        } else if (this.seikaiCount === 2) {
          this.correct2 = true
        } else if (this.seikaiCount === 3) {
          this.correct3 = true
        } else if (this.seikaiCount === 4) {
          this.correct4 = true
        } else if (this.seikaiCount === 5) {
          this.correct5 = true
        }
      } else {
        this.checkA = '残念( *´艸｀)'
      }

      let cnt = 0
      new Promise((resolve) => {
      const ansTime = setInterval(() => {
        this.userChose1 = !this.userChose1
        this.randomSelectIn()
        cnt++
        if (cnt > 0) {
        clearInterval(ansTime)
        }
        resolve(); //終わったよー
      }, 2000);
      }).then(() => { //はーい
        this.checkA = ''
      })
    },

    qActive2(sc1) {
      this.userChose2 = !this.userChose2
      this.erandakuni = this.selectedCountries[1].alpha2

      if(sc1 === this.kuni) {
        this.checkA = '正解(∩´∀｀)'
        this.seikaiCount++
        if(this.seikaiCount === 1) {
          this.correct1 = true
        } else if (this.seikaiCount === 2) {
          this.correct2 = true
        } else if (this.seikaiCount === 3) {
          this.correct3 = true
        } else if (this.seikaiCount === 4) {
          this.correct4 = true
        } else if (this.seikaiCount === 5) {
          this.correct5 = true
        }
      } else {
        this.checkA = '残念( *´艸｀)'
      }

      let cnt = 0
      new Promise((resolve) => {
      const ansTime = setInterval(() => {
        this.userChose2 = !this.userChose2
        this.randomSelectIn()
        cnt++
        if (cnt > 0) {
        clearInterval(ansTime)
        }
        resolve(); //終わったよー
      }, 2000);
      }).then(() => { //はーい
        this.checkA = ''
      })
    },
    qActive3(sc2) {
      this.userChose3 = !this.userChose3
      this.erandakuni = this.selectedCountries[2].alpha2
      
      if(sc2 === this.kuni) {
        this.checkA = '正解(∩´∀｀)'
        this.seikaiCount++
        if(this.seikaiCount === 1) {
          this.correct1 = true
        } else if (this.seikaiCount === 2) {
          this.correct2 = true
        } else if (this.seikaiCount === 3) {
          this.correct3 = true
        } else if (this.seikaiCount === 4) {
          this.correct4 = true
        } else if (this.seikaiCount === 5) {
          this.correct5 = true
        }
      } else {
        this.checkA = '残念( *´艸｀)'
      }

      let cnt = 0
      new Promise((resolve) => {
      const ansTime = setInterval(() => {
        this.userChose3 = !this.userChose3
        this.randomSelectIn()
        cnt++
        if (cnt > 0) {
        clearInterval(ansTime)
        }
        resolve(); //終わったよー
      }, 2000);
      }).then(() => { //はーい
        this.checkA = ''
      })
    },
  }
}

//質問したこと
//v-forの回数指定。
//ラジオボタンの特性（valueがいる）
//配列の中のオブジェクトをランダムで、３つ選ぶ方法
//indexOfの使い方

</script>