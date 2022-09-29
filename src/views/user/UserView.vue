<template>
  <div class="user">
    <header>
      <div class="user-info">
        <van-image :src="avatar" round />
        <div class="info" v-if="isLogin">
          <span class="nickname">{{ nickname }}</span>
          <div class="id-gender">
            <span class="id">id: {{ id }}</span>
            <span class="gender">{{ gender === 1 ? '♂' : '♀' }}</span>
          </div>
        </div>
        <div class="login-bar" v-else>
          <a href="javascript:" @click.prevent="onLogin">登录 / 注册</a>
        </div>
      </div>
      <div class="logout" @click="logout">
        <van-icon name="back-top" />
        <span>退出</span>
      </div>
    </header>
    <main>
      <div class="link-list">
        <van-grid column-num="3" square>
          <van-grid-item v-for="item in links">
            <a href="javascript:" @click.prevent="">{{ item }}</a>
          </van-grid-item>
        </van-grid>
      </div>
    </main>
  </div>
  <router-view v-slot="{Component}" @finishLogin="finishLogin">
    <transition name="van-slide-right">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { inject, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive<any>({
  avatar: new URL('../../assets/avatar.jpg', import.meta.url).href,
  gender: 0,
  id: '',
  nickname: '',
  username: '',
})

//#region 检查登陆状态
const isLogin = ref<boolean>(false)
const checkLogin = () => {
  if (localStorage.getItem('token')) {
    isLogin.value = true
    const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
    user.avatar = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.itc.cn%2Fimages01%2F20211117%2F33fc5bfb03fe4117b6c8ef677a2d51c2.jpeg&refer=http%3A%2F%2Fp1.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666253150&t=510591bd498701aec29fae3badfd412d'
    user.nickname = userInfo.nickname
    user.id = userInfo.id
    user.gender = userInfo.gender
  }
}
checkLogin()

const finishLogin = () => {
  checkLogin()
}
//#endregion

//#region 退出登录
const reload = inject('reload') as () => void

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  reload()
}
//#endregion

const { avatar, nickname, id, gender } = toRefs(user)

const onLogin = () => {
  router.push('/user/login')
}

const links: string[] = [
  '我的订单', '优惠券', '我的足迹', '我的收藏', '地址管理', '联系客服', '帮助中心', '意见反馈',
]

</script>

<style lang="scss" scoped>
.user {
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
    background-color: #333;

    .user-info {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .van-image {
        margin-bottom: 10px;
        width: 60px;
      }

      .info {
        display: flex;
        flex-flow: column;
        align-items: center;
        color: #fff;

        .nickname {
        }

        .id {
          margin-right: 4px;
          color: #8f8f8f;
        }

        .gender {
          color: #a7a7e5;
        }
      }

      .login-bar {
        a {
          color: #fff;
        }
      }
    }

    .logout {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #8d8c8c;

      .van-icon-back-top {
        transform: rotate(90deg);
        margin-right: 4px;
      }
    }
  }

  main {
    position: relative;
    top: -10px;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;

    .link-list {
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #333;
      }
    }
  }
}

</style>
