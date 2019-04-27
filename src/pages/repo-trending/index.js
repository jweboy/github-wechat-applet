import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtListItem, AtList, AtToast, AtFab, AtTag } from 'taro-ui';
import qs from 'query-string'
import request from '../../utils/request'
import languages from '../../utils/language';
import './index.scss'

const sinces = [{
  name: 'Today',
  value: 'daily',
}, {
  name: 'Week',
  value: 'weekly',
}, {
  name: 'Month',
  value: 'monthly',
}]

class RepoTrending extends Component {
  constructor(props) {
    super(props)

    this.state = {
      language: languages[0],
      since: sinces[0],
      list: [],
      loading: false,
      selector: [sinces, languages],
    }
    this.screenHeight = Taro.getSystemInfoSync().screenHeight
    this.filterHeight = 0
  }
  componentDidMount() {
    this.setState({
      loading: true,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { loading } = this.state
    if(prevState.loading !== loading && loading) {
      this.asyncGetTrendingResult().then((data) => {
        this.setState({
          list: data,
          loading: false,
        })
      })
    }
  }

  asyncGetTrendingResult() {
    const { since, language } = this.state
    return request('/repositories', {
      baseUrl: 'https://github-trending-api.now.sh',
      data: {
        language: language.value,
        since: since.value,
      }
    })
  }

  handlePickerChange = ({ detail }) => {
    const [sinceIndex, languageIndex] = detail.value
    this.setState({
      loading: true,
      language: languages[languageIndex],
      since: sinces[sinceIndex],
    })
  }

  handleItemClick = (item) => {
    const query = {
      ownerName: item.author,
      repoName: item.name,
    }

    Taro.redirectTo({
      url: `/pages/repo-detail/index?${qs.stringify(query)}`,
    })
  }

  handleNavigateToSearchPage() {
    Taro.navigateTo({
      url: '/pages/search-repo/index',
    })
  }

  render() {
    const { loading, list, selector, since, language } = this.state
    return (
      <View>
        <AtToast isOpened={loading} status='loading' text='加载中...' />
        <View className='filter' id='filter'>
          <View>
            <AtTag className='tag' type='primary' circle active>
              {since.name}
            </AtTag>
            <AtTag className='tag' type='primary' circle active>
              {language.name}
            </AtTag>
          </View>
          <View className='at-icon at-icon-search' onClick={this.handleNavigateToSearchPage} />
        </View>
        <View className='fab-btn'>
          <Picker
            rangeKey='name'
            mode='multiSelector'
            range={selector}
            onChange={this.handlePickerChange}
          >
            <AtFab>
              <Text>筛选</Text>
            </AtFab>
          </Picker>
        </View>
        <AtList>
          <View>
            {
              list.map((item) => (
                <AtListItem
                  key={item.id}
                  title={item.name}
                  note={item.description}
                  extraText={`star:${item.stars}`}
                  thumb={require('../../imgs/octocat.png')}
                  onClick={() => this.handleItemClick(item)}
                />
              ))
            }
          </View>
        </AtList>
      </View>
    )
  }
}

export default RepoTrending
