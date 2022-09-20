<template>
  <div class="login">
    <div class="logo">
      <van-icon name="fire" />
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="pwd"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
        <van-button round block @click="$router.go(-1)">
          返回
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { postLogin } from '@/api/login'
import { useRouter } from 'vue-router'

const router = useRouter()

//#region 登录
const username = ref('')
const password = ref('')

interface Emit {
  (e: 'finishLogin'): void
}

const emit = defineEmits<Emit>()

const login = async (data: any) => {
  const res = await postLogin(data)
  if (res.errno === 0) {
    const { token, userInfo } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    emit('finishLogin')
    await router.push('/user')
  }
}

const onSubmit = (values: any) => {
  login(values)
}
//#endregion

</script>

<style lang="scss" scoped>


.login {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 1;
  text-align: center;

  .van-button {
    margin-bottom: 10px;
  }

  .logo {
    margin: 120px 0 40px;
    color: #f00;

    .van-icon-fire {
      font-size: 60px;
    }
  }
}
</style>
