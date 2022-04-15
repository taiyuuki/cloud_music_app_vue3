<template>
  <div class="search-music">
    <div class="search-top">
      <input
        class="search-input-text"
        placeholder="输入关键词"
        v-model="keyword"
        @keydown.enter="search(keyword)"
        @focus="getSuggest"
        @input="getSuggest"
      />
      <div class="cancel" @click="back">取消</div>
    </div>
    <div class="search-history" v-show="keyword === '' && !isSearching">
      <div class="search-history-title">
        <div class="text">历史</div>
        <div class="clear-all" @click="clearHistory">
          <Icon xurl="#icon-shanchu" />
        </div>
      </div>
      <div class="keyword">
        <span
          v-for="(key, i) in keywordList"
          class="keyword-item"
          :key="key"
          @click="search(key)"
          >{{ key }}</span
        >
      </div>
    </div>
    <SearchResult v-if="isSearching && !isTyping" :sResult="sResult" />
    <SuggestKeyword
      v-if="isTyping && keyword !== ''"
      :suggestList="suggestList"
      @search="search"
    />
  </div>
</template>

<style lang="less">
.search-music {
  width: 7.1rem;
  margin: 0.4rem 0.2rem 0.2rem;
  justify-content: space-between;
  .search-top {
    display: flex;
    height: 0.6rem;
    align-items: center;
    .search-input-text {
      flex: 7;
      border-radius: 0.3rem;
      height: 0.6rem;
      padding: 0 0.3rem;
      border: 0;
      outline: none;
      background-color: rgb(222, 222, 222);
      &:focus {
        border: 0;
        outline: 0;
      }
    }
    .cancel {
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.3rem;
      font-weight: bold;
      font-family: "微软雅黑";
      padding: 0 0.1rem;
      cursor: pointer;
    }
  }
  .search-history {
    margin-top: 0.5rem;
    .search-history-title {
      font-size: 0.3rem;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        cursor: pointer;
      }
    }
    .keyword {
      font-family: "Courier New", Courier, monospace;
      margin: 0.1rem 0;
      height: 0.5rem;
      overflow-x: scroll;
      white-space: nowrap;
      overflow-y: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .keyword-item {
        display: inline-block;
        font-family: "微软雅黑", "heiti", "ht", "黑体";
        font-size: 0.2rem;
        height: 0.5rem;
        margin-right: 0.1rem;
        line-height: 0.3rem;
        padding: 0.1rem 0.2rem;
        text-align: center;
        background-color: rgb(230, 230, 230);
        border-radius: 0.2rem;
        cursor: pointer;
      }
    }
  }
}
</style>

<script lang='ts'>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Icon from "../components/Icon.vue";
import SearchResult from "../components/search/SearchResult.vue";
import { searchApi, getSuggestApi } from "@/api/index";
import SuggestKeyword from "../components/search/SuggestKeyword.vue";
import { getLS, setLS, removeLS } from "../api/storage";
export default {
  name: "search",
  components: { Icon, SearchResult, SuggestKeyword },
  setup() {
    const KEYWORD_LIST = "keywordlist";
    let router = useRouter();
    let keyword = ref(""); // 当前搜索关键词
    let keywordList: string[] = reactive([]); // 搜索历史
    let sResult: any[] = reactive([]); // 搜索结果
    let suggestList: any[] = reactive([]); // 建议搜索关键词
    let isTyping = ref(false); // 输入状态
    let isSearching = ref(false); // 搜索状态

    // 载入搜索历史
    if (getLS(KEYWORD_LIST)) {
      keywordList = getLS(KEYWORD_LIST);
    }

    // 返回
    const back = () => {
      keywordList.length = 0;
      isSearching.value = false;
      router.back();
    };

    // 保存搜索关键词
    const saveKeyword = (str: string): void => {
      if (keywordList.length >= 10) {
        keywordList.pop();
      }
      for (let i = keywordList.indexOf(str); i >= 0; i--) {
        if (i === 0) {
          keywordList.shift();
        } else {
          keywordList[i] = keywordList[i - 1];
        }
      }
      keywordList.unshift(str);
      setLS(KEYWORD_LIST, keywordList);
    };

    // 清空历史
    const clearHistory = () => {
      keywordList.length = 0;
      removeLS(KEYWORD_LIST);
    };

    // 搜索音乐
    const search = (str: string): void => {
      isTyping.value = false;
      sResult.length = 0;
      keyword.value = str;
      saveKeyword(str);
      searchApi(str).then((data: any) => {
        data.result.songs.forEach((item: any) => {
          sResult.push(item);
        });
        isSearching.value = true;
      });
    };

    // 获取建议搜索
    const getSuggest = () => {
      isTyping.value = true;
      isSearching.value = false;
      suggestList.length = 0;
      if (keyword.value.trim() !== "") {
        keywordList.forEach((key) => {
          if (key.startsWith(keyword.value)) {
            suggestList.push({
              keyword: key,
              type: 0,
            });
          }
        });
        getSuggestApi(keyword.value, "mobile").then((data) => {
          if (data.result.allMatch.length) {
            data.result.allMatch.forEach((item: any) => {
              if (
                suggestList.every((el) => {
                  return el.keyword !== item.keyword;
                })
              )
                suggestList.push({
                  keyword: item.keyword,
                  type: item.type,
                });
            });
          }
        });
      } else {
        isTyping.value = false;
      }
    };
    return {
      keyword,
      keywordList,
      back,
      search,
      sResult,
      isTyping,
      isSearching,
      suggestList,
      clearHistory,
      getSuggest,
    };
  },
};
</script>