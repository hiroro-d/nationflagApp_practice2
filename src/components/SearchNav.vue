<template>
  <div class="navbar mb-5 flex justify-center">
    <div class="card w-96 h-20 bg-base-100 shadow-xl image-full">
      <figure><img src="@/assets/flagMap.jpeg" alt="searchLogo"/></figure>
      <div class="card-body">
        <h2 class="card-title text-primary text-3xl">けんさくページ!</h2>
      </div>
    </div>

    <div class="gap-2 absolute right-5 top-32">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-32">
          <li>
            <a class="justify-between">
              自分のページ
            </a>
          </li>
          <li><a>クイズ！</a></li>
          <li><a>ログアウト</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>