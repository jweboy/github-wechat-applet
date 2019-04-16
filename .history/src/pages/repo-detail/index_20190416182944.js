import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'

class RepoDetail extends Component {
  componentDidMount() {
    console.warn(this.$router)
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
