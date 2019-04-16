import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtToast, AtSearchBar } from 'taro-ui'
import request from '../../utils/request'

class SearchRepos extends Component {
  state = {
    repos: [],
    loading: false,
    keyword: '',
  }
  componentDidMount() {
    this.setState({
      loading: true
    }, () => {
      this.asyncGetSearchResult();
    });
  }
  asyncGetSearchResult = (keyword = 'javascript') => {
    request('/search/repositories', {
      data: {
        q: keyword,
      }
    }).then(({ data }) => {
      this.setState({
        repos: data.items,
        loading: false,
      })
    });
  };

  handleSearchRepos = () => {
    const { keyword } = this.state;
    this.setState({
      loading: true
    }, () => {
      this.asyncGetSearchResult(keyword);
    });
  };

  handleSearchChange = (value) => {
    this.setState({
      keyword: value,
    });
  };

  render() {
    const { repos, keyword, loading } = this.state;
    return (
      <View>
        <AtToast isOpened={loading} text='加载中...' icon='loading'></AtToast>
        <AtSearchBar
          value={keyword}
          onChange={this.handleSearchChange}
          onActionClick={this.handleSearchRepos}
        />
        <AtList>
          {
            repos.map((repo) => (
              <View key={repo.id}>
                <AtListItem
                  title={repo.full_name}
                  thumb={repo.owner.avatar_url}
                  arrow='right'
                  hasBorder={false}
                />
                <Text>fork: {repo.forks_count}</Text>
                <Text>star: {repo.watchers_count}</Text>
              </View>
            ))
          }
        </AtList>
      </View>
    )
  }
}

export default SearchRepos

