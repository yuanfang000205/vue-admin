<template>
  <el-row class="home" :getter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2021-7-1</span></p>
          <p>上次登录地点:<span>深圳</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column show-overflow-tooltip v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex',padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <span class="num">￥{{item.value}}</span>
            <span class="txt">{{item.name}}</span>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px">
        <echart style="height: 280px" :chartData="echartsData.order"/>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 280px">
        <echart style="height: 260px" :chartData="echartsData.user"/>
        </el-card>
        <el-card shadow="hover" style="height: 280px">
          <echart style="height: 260px" :chartData="echartsData.video" :isAxisChart="false"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHome } from '../../api/data'
import Echart from '../../components/Echart.vue'
export default {
  components: { Echart },
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [],
      tableLabel: {
        name: '手机',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      echartsData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getTableData () {
      getHome().then((res) => {
        // console.log(res)
        const data = res.data
        this.tableData = data.tableData

        // 折线图的展示
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        // console.log(keyArray)
        // console.log(order.data[0])
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line'
          })
        })
        this.echartsData.order.xData = xData
        this.echartsData.order.series = series

        // 用户柱状图
        this.echartsData.user.xData = data.userData.map(item => item.date)
        this.echartsData.user.series = [
          {
            name: '新增用户',
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
          }
        ]

        // 手机饼图
        this.echartsData.video.series = [
          {
            data: data.videoData,
            type: 'pie'
          }
        ]
      })
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="sass" scoped>
@import "~@/assets/scss/home"
</style>
