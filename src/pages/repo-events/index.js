import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtAvatar, AtToast } from 'taro-ui'
import qs from 'query-string'

import dayjs from '../../utils/day'
import request from '../../utils/request'
import './index.scss'

class RepoEvents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      page: 1,
      loading: false,
    }

    this.systemInfo = Taro.getSystemInfoSync()
    this.isFetching = false;
  }

  componentDidMount() {
    this.setState({ loading: true })
  }

  componentDidUpdate(_, prevState) {
    const { page, loading } = this.state
    if(prevState.loading !== loading && loading) {
      if(!this.isFetching) {
        this.isFetching = true
        this.asyncGetRepoEvents({ page })
        .then((data) => {
          this.isFetching = false
          this.setState(({ list }) => ({
            page,
            loading: false,
            list: [...list, ...data]
          }))
        })
      }
    }
  }

  asyncGetRepoEvents({ page }) {
    const { params } = this.$router

    return request(`/repos/${params.ownerName}/${params.repoName}/events`, {
      data: {
        page,
        per_page: 15,
      }
    })
  }

  handleScrollMore = () => {
    this.setState(({ page }) => ({
      loading: true,
      page: ++page,
    }))
  }

  handleScrollRefresh = () => {
    this.setState({
      loading: true,
      page: 1,
      list: [],
    })
  }

  getCurrentAction(item) {
    if(item.type === 'ForkEvent') {
      return 'forked'
    }
    return item.payload.action
  }

  render() {
    const { list, loading } = this.state
    return (
      <ScrollView
        scrollY
        style={`height: ${this.systemInfo.screenHeight}px;`}
        scrollWithAnimation
        enableBackToTop
        onScrollToLower={this.handleScrollMore}
        onScrollToUpper={this.handleScrollRefresh}
      >
        <AtToast isOpened={loading} status='loading' text='加载中...' />
        <View className='layout'>
          {
            list.map((item) => (
              <View className='item'  key={item.id}>
                <View className='at-row'>
                  <View className='at-col at-col-1 at-col--auto avatar'>
                    <AtAvatar image={item.actor.avatar_url} circle />
                  </View>
                  <View className='at-col at-col--wrap'>
                    <Text className='active'>{item.actor.display_login}</Text>
                    {` ${this.getCurrentAction(item)} from `}
                    <Text className='active'>{item.repo.name}</Text>
                  </View>
                </View>
                <View className='tags'>
                  <Text className='create-date'>
                    {dayjs(item.created_at).fromNow()}
                  </Text>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}

export default RepoEvents
