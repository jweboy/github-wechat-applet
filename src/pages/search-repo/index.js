import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtList, AtListItem, AtToast, AtSearchBar, AtMessage } from 'taro-ui'
import qs from 'query-string'
import request from '../../utils/request'
import './index.scss'

class SearchRepos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      repos: [],
      loading: false,
      keyword: '',
      page: 1,
      action: '',
    }

    this.systemInfo = Taro.getSystemInfoSync()
    this.isFetching = false
  }

  // componentDidMount() {
  //   this.asyncGetSearchResult().then(({ items }) => {
  //     this.setState(({ repos }) => ({
  //       repos: [...repos, ...items],
  //     }))
  //   })
  // }

  componentDidUpdate(prevProps, prevState) {
    const { loading, action } = this.state
    if(prevState.loading !== loading && loading) {
      if(!this.isFetching) {
        this.isFetching = true
        if(action !== 'scrollMore') {
          this.setState({
            repos: [],
          })
        }
        this.asyncGetSearchResult().then(({ items }) => {
          this.isFetching = false
          this.setState(({ repos }) => ({
            repos: [...repos, ...items],
            loading: false,
          }))
        })
      }
    }
  }


  getListData = () => {
    this.setState({
      loading: true
    })
  }

  asyncGetSearchResult() {
    const { keyword, page } = this.state
    return request('/search/repositories', {
      data: {
        q: keyword,
        page,
        per_page: 15
      }
    })
  }

  handleSearchClick = () => {
    const { keyword } = this.state

    if(keyword === '') {
      return Taro.atMessage({
        type: 'error',
        message: '请输入关键词',
      })
    }

    this.setState({
      loading: true,
      action: 'search',
    })
  }

  handleSearchChange = (value) => {
    this.setState({
      keyword: value,
    })
  }

  handleSearchClear = () => {
    this.setState({
      keyword: '',
    })
  }

  handleJumpToDetailPage(repo) {
    const query = {
      ownerName: repo.owner.login,
      repoName: repo.name,
    }

    Taro.navigateTo({
      url: `/pages/repo-detail/index?${qs.stringify(query)}`,
    })
  }

  handleScrollMore = () => {
    const { keyword } = this.state
    if(!keyword) {
      return
    }

    this.setState(({ page }) => ({
      loading: true,
      page: ++page,
      action: 'scrollMore',
    }))
  }

  handleScrollRefresh = () => {
    const { keyword } = this.state
    if(!keyword) {
      return
    }

    this.setState({
      loading: true,
      action: 'refresh',
      page: 1,
      repos: [],
    })
  }

  render() {
    const { repos, keyword, loading } = this.state;
    return (
      <View>
        <AtMessage />
        <AtToast isOpened={loading} status='loading' text='加载中...' />
        <AtSearchBar
          fixed
          className='search-input'
          value={keyword}
          onChange={this.handleSearchChange}
          onActionClick={this.handleSearchClick}
          onClear={this.handleSearchClear}
        />
        <ScrollView
          scrollY
          scrollWithAnimation
          enableBackToTop
          onScrollToLower={this.handleScrollMore}
          onScrollToUpper={this.handleScrollRefresh}
          style={`height: ${this.systemInfo.screenHeight}px;`}
        >
          <AtList>
            {
              repos.map((repo) => (
                <AtListItem
                  key={repo.id}
                  title={repo.name}
                  thumb={repo.owner.avatar_url}
                  note={repo.description}
                  arrow='right'
                  extraText={`star: ${repo.watchers_count}`}
                  onClick={() => this.handleJumpToDetailPage(repo)}
                />
              ))
            }
          </AtList>
        </ScrollView>
      </View>
    )
  }
}

export default SearchRepos

