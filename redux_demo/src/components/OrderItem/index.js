import React, { Component } from 'react'
import './style.css'

export default class OrderItem extends Component {
  constructor(props){
    super()
    this.state = {
      editing: false,
      stars: props.stars || 0,
      comment: props.comment || ''
    }
  }
  render() {
    const {shop,product,price,picture,isCommented} = this.props.data
    return (
      <div className="orderItem">
        <div className="orderItem__picContainer">
          <img alt="img" src={picture} className="orderItem__pic" />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="orderItem__shop">{shop}</div>
          <div className="orderItem__detail">
            <div className="orderItem__price">{price}</div>
            <div>
              {
                isCommented ? (
                  <button className="orderItem__btn orderItem__btn--grey">已评价</button>
                ) : (
                  <button className="orderItem__btn orderItem__btn--red" onClick={this.handleOpenEditArea}>评价</button>
                )
              }
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    )
  }

  // 评价区域
  renderEditArea(){
    return (
      <div className="orderItem__commentContainer">
        <textarea onChange={this.handleCommentChange} value={this.state.comment} className="orderItem__comment" />
        {this.renderStars()}
        <button className="orderItem__btn orderItem__btn--red" onClick={this.handleSubmitComment}>提交</button>
        <button className="orderItem__btn orderItem__btn--grey" onClick={this.handleCancelComment}>取消</button>
      </div>
    )
  }

  // 五角星打星区域
  renderStars(){
    const {stars} = this.state
    return (
      <div>
        {
          [1,2,3,4,5].map((item,index)=>{
            const light = stars >= item ? 
            'orderItem__star--light' : ''
            return (
              <span className={light} key={index} onClick={this.handleClickStars.bind(this, item)}>☆</span>
            )
          })
        }
      </div>
    )
  }

  // 点击评价
  handleOpenEditArea = () => {
    this.setState({editing: true})
  }

  // 提交评价
  handleCommentChange = (e) => {
    this.setState({comment: e.target.value})
  }
  
  // 点击打星
  handleClickStars = (stars) => {
    this.setState({stars: stars})
  }

  // 取消评价
  handleCancelComment = () => {
    this.setState({
      editing: false,
      stars: this.props.data.stars || 0,
      comment: this.props.data.comment || ''
    })
  }

  // 提交评价
  handleSubmitComment = () => {
    const {id} = this.props.data
    const {comment, stars} = this.state
    this.setState({editing: false})
    this.props.onSubmit(id, comment, stars)
  }
}
