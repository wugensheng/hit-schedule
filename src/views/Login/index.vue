<template>
<div>
  <van-nav-bar
  title="哈工大研究生在线课表"/>
  <van-form @submit="onSubmit">
  <van-field
    v-model="studentId"
    name="studentId"
    label="学号"
    required
    :rules="[{ required: true, message: '请正确填写学号',pattern:/^[12]\d[SB]\d{6}$/ }]"
  />
  <div style="margin: 16px;">
    <van-button :loading="isLoading"  :disabled="isLoading" loading-text="查询中..." round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
</div>
</template>

<script>
import { login } from '@/api/index'
import { Notify } from 'vant'
// import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      studentId: '',
      semester: 1,
      year: 2022,
      isLoading: false,
      weekSchedule: [],
      schedule: []
    }
  },
  methods: {
    getPeriod (period) {
      return {
        period,
        mon: '',
        tues: '',
        wed: '',
        thur: '',
        sat: '',
        fri: '',
        sun: ''
      }
    },
    getWeekSchedule () {
      for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 6; j++) {
          this.weekSchedule.push(this.getPeriod(`${j * 2 - 1}/${j * 2}`))
        }
      }
      const wkd = ['sun', 'mon', 'tues', 'wed', 'thur', 'sat', 'fri']
      this.schedule.forEach((item, index) => {
        wkd.forEach(d => {
          const info = item[d].replace(/[◇]/g, '|').replace(/[，]/g, ',') // 替换
          // console.log('info: ', info)
          if (info === '') return
          const classname = info.slice(0, info.indexOf('|')) // 获取课程名
          // console.log('classname: ', classname)
          let location = info.match(/(^)?[\]|][^\\[]+\[[^\\[]*\]节($)?/)
          if (!location) return
          location = location[0]
          if (!location) return
          if (location[0] === '|' || location[0] === ']') location = location.slice(1, location.length)
          if (location[0] === '|') location = location.slice(1, location.length)
          location = location.slice(0, location.indexOf('[')).replace(' ', '') // 上课地点
          // console.log('location: ', location)
          const matches = info.match(/(^)?(\[)[^\\[\]]*周(\])($)?/g) // 获取周信息
          // console.log('matches: ', matches)
          if (!matches || matches.length === 0) return
          matches.forEach(weekMatch => { // 对周信息进行解析
            const reg = new RegExp(`[|,][^\\[]{0,3}\\[${weekMatch.slice(1, weekMatch.length - 1)}\\]`, 'g')
            const result = reg.exec(info) // 根据周，去获取老师信息, 老师和周的信息绑定
            // console.log('result: ', result)
            if (!result || result.length !== 1) return
            const teacherWeek = result[0].slice(1, result[0].length) // 格式name[xx-xx周]
            // console.log('teacherWeek: ', teacherWeek)
            const teacher = teacherWeek.slice(0, teacherWeek.indexOf('[')) // 老师名
            // console.log('teacher: ', teacher)
            const week = teacherWeek.match(/(^)?\d+($)?/g) // 上课周
            // console.log('week:in, week)
            week.forEach(wk => {
              this.weekSchedule[(Number(wk) - 1) * 6 + index + 1][d] = !teacher ? (location ? `${classname}◇${location}` : `${classname}`) : (location ? `${classname}◇${location}◇${teacher}` : `${classname}◇${teacher}`)
            })
          })
        })
      })
    },
    async onSubmit (values) {
      this.isLoading = true
      try {
        const res = await login({
          info: JSON.stringify({
            gxh: this.studentId,
            xnxq: `${this.year}-${this.year + 1};${this.semester}`
          })
        })
        this.isLoading = false
        Notify({ type: 'success', message: '查询成功', duration: 600 })
        this.schedule = res.data.module
        this.getWeekSchedule()
        this.$router.push({
          path: '/layout/home'
        })
      } catch (error) {
        this.isLoading = false
        Notify({ type: 'danger', message: '未查询到该学号信息', duration: 1000 })
      }
    }
  },
  mounted () {
    const that = this
    this.$bus.$on('setTableData', () => {
      that.$bus.$emit('getTableData', that.weekSchedule)
    })
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
