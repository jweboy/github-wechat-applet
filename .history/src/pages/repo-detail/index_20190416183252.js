import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import request from '../../utils/request'

class RepoDetail extends Component {
  componentDidMount() {
    console.warn(this.$router)
  }

  asyncGetRepoDetail = () => {
    request({
      url: '/repos/jweboy/jweboy-cli'
    })
  }

  handlReturnClick = () => {
    Taro.navigateBack();
  };
  render() {
    return (
      <View>
        <AtNavBar title='Repository' leftText='返回' onClickLeftIcon={this.handlReturnClick} />
        RepoDetail
      </View>
    )
  }
}

export default RepoDetail
