<template>
<div>
  <van-nav-bar
  title="黑马头条"/>
  <van-form @submit="onSubmit">
  <van-field
    v-model="user.mobile"
    name="mobile"
    label="手机号"
    required
    :rules="[{ required: true, message: '请正确填写手机号',pattern:/^1[3-9]\d{9}$/ }]"
  />
  <van-field
    v-model="user.code"
    type="password"
    name="code"
    label="密码"
    placeholder="密码"
    required
    :rules="[{ required: true, message: '请正确填写密码', pattern: /^\d{6}$/}]"
  />
  <div style="margin: 16px;">
    <van-button :loading="isLoading"  :disabled="isLoading" loading-text="登录中..." round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
</div>
</template>

<script>
import { login } from '@/api/index'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      user: {
        mobile: '17356218187',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (values) {
      this.isLoading = true
      try {
        const res = await login(this.user)
        this.isLoading = false
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登录成功' })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
    }
  }
}
</script>

/* scoped的原理是webpack对模板进行标记,然后根据这个标记去进行样式修改*/
<style scoped lang="less">
.van-nav-bar{
  background-color: #007bff;
}
/*deep 表示对标记进行穿透，对标记内部的节点进行样式修改 */
/deep/ .van-nav-bar__title{
  color: white
}
</style>
