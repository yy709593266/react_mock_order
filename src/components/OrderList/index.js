import React, { Component } from 'react'
import OrderItem from '../OrderItem'

export default class OrderList extends Component {
  constructor(props){
    super(props)
    this.state = {data: []}
  }
  componentDidMount(){
    const baseUrl = 'https://www.easy-mock.com/mock/5c6569ee836dd91308a88815/order'
    fetch(`${baseUrl}/order/orderList`).then(res=>{
      if(res.ok){
        res.json().then(resData=>{
          this.setState({
            data: resData.data
          })
        })
      }
    })
  }
  render() {
    return (
      <div>
        {
          this.state.data.map(item=>{
            return <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit} />
          })
        }
      </div>
    )
  }

  // 模拟提交
  handleSubmit = (id, comment, stars) => {
    // 这里没有服务器所以直接修改原数据模拟评价成功
    const newData = this.state.data.map(item => {
      return item.id === id ? 
      {
        ...item, 
        comment, 
        stars, 
        isCommented: true
      }: item
    })
    this.setState({
      data: newData
    })
  }
}
