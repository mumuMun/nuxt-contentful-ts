import { Module, ActionContext, ActionTree, MutationTree } from 'vuex'
import dayjs from 'dayjs'
import { RootState } from './types'
import { Dictionary, Post, Param, PostsDate, Category } from '~/types/blog'
import { createClient } from '~/plugins/contentful'

const client = createClient()

const ORDER = '-fields.publishDate'

const PAGE = 6

const namespaced = true

export const state = (): State => ({
  isCookieAccepted: false,
  latestPosts: {},
  posts: {},
  currentPost: null,
  page: 1,
  pagesTotal: 0,
  tags: [],
  postsDate: {},
  categories: {}
})

export interface State {
  isCookieAccepted: boolean | false
  latestPosts: Dictionary<Post>
  posts: Dictionary<Post>
  currentPost: Post | null
  page: number
  pagesTotal: number
  tags: string[]
  postsDate: Dictionary<PostsDate>
  categories: Dictionary<Category>
}

export interface RootState extends State {
  //
}

export const mutations: MutationTree<State> = {
  acceptCookie(state) {
    state.isCookieAccepted = true
  },
  setLatestPosts(state, payload) {
    state.latestPosts = payload
  },
  setPosts(state, payload) {
    state.posts = payload
  },
  setCurrentPost(state, payload) {
    state.currentPost = payload
  },
  setPage(state, payload) {
    state.page = payload
  },
  setPagesTotal(state, payload) {
    state.pagesTotal = payload
  },
  setTags(state, payload) {
    state.tags = payload
  },
  setPostsDate(state, payload) {
    state.postsDate = payload
  },
  setCategories(state, payload) {
    state.categories = payload
  }
}

export const actions: RootActionTree<State, RootState> = {
  async nuxtServerInit({ commit, state }: ActionContext<State, RootState>) {
    commit('setPage', !state.page ? 1 : state.page)

    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER
        // skip: (state.page - 1) * PAGE,
        // limit: PAGE
      })
      .then((entries: any) => {
        commit('setPosts', entries.items)
        commit('setPagesTotal', Math.ceil(entries.total / PAGE))
      })
  },
  async initPosts(
    { commit, state }: ActionContext<State, RootState>,
    params: Param
  ) {
    // 投稿詳細ページ
    if (params.slug !== '' && params.slug !== void 0) {
      const LATEST_PAGE = 6

      await client
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          order: ORDER,
          limit: LATEST_PAGE
        })
        .then((entries: any) => {
          commit('setLatestPosts', entries.items)
        })

      await client
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          order: ORDER
        })
        .then((entries: any) => {
          const currentPost = entries.items.filter((item: any) => {
            return item.fields.slug === params.slug
          })

          commit('setCurrentPost', currentPost[0])
        })
      return
    }

    // 日付（年-月）による絞り込み
    commit('setPage', state.page)
    if (params.date !== '' && params.date !== void 0) {
      // const LATEST_PAGE = 6
      await client
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          order: 'sys.createdAt',
          'sys.createdAt[gte]': dayjs(params.date).format(),
          'sys.createdAt[lte]': dayjs(params.date)
            .endOf('month')
            .format(),
          skip: (state.page - 1) * PAGE,
          limit: PAGE
        })
        .then((entries: any) => {
          const dateArray: string[] = []
          entries.items.forEach((item: any) => {
            const date = dayjs(item.fields.createdAt)
            dateArray.push(date.format('YYYY-MM'))
          })
          const counts: Dictionary<number> = {}
          for (let i = 0; i < dateArray.length; i++) {
            const key = dateArray[i]
            counts[key] = counts[key] ? counts[key] + 1 : 1
          }
          const countDate: Array<{ date: string; count: string }> = []
          Object.keys(counts).forEach((key) =>
            countDate.push({ date: key, count: String(counts[key]) })
          )

          commit('setPosts', entries.items)
          commit('setPagesTotal', Math.ceil(entries.total / PAGE))
          // commit('setPostsDate', countDate)
        })
      return
    }
    // カテゴリーによる絞り
    if (params.category !== '' && params.category !== void 0) {
      // const LATEST_PAGE = 6
      console.log('=========')
      console.log(state.categories[params.category].id)
      await client
        .getEntries({
          links_to_entry: state.categories[params.category].id,
          order: 'sys.createdAt',
          skip: (state.page - 1) * PAGE,
          limit: PAGE
        })
        .then((entries: any) => {
          const dateArray: string[] = []
          entries.items.forEach((item: any) => {
            const date = dayjs(item.fields.createdAt)
            dateArray.push(date.format('YYYY-MM'))
          })
          const counts: Dictionary<number> = {}
          for (let i = 0; i < dateArray.length; i++) {
            const key = dateArray[i]
            counts[key] = counts[key] ? counts[key] + 1 : 1
          }
          const countDate: Array<{ date: string; count: string }> = []
          Object.keys(counts).forEach((key) =>
            countDate.push({ date: key, count: String(counts[key]) })
          )

          commit('setPosts', entries.items)
          commit('setPagesTotal', Math.ceil(entries.total / PAGE))
          // commit('setPostsDate', countDate)
        })
      return
    }

    // デフォルト
    console.log('=====================')
    console.log('デフォルト')
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        skip: (state.page - 1) * PAGE,
        limit: PAGE
      })
      .then((entries: any) => {
        const dateArray: string[] = []
        entries.items.forEach((item: any) => {
          const date = dayjs(item.fields.createdAt)
          dateArray.push(date.format('YYYY-MM'))
        })
        const counts: Dictionary<number> = {}
        for (let i = 0; i < dateArray.length; i++) {
          const key = dateArray[i]
          counts[key] = counts[key] ? counts[key] + 1 : 1
        }
        const countDate: Array<{ date: string; count: string }> = []
        Object.keys(counts).forEach((key) =>
          countDate.push({ date: key, count: String(counts[key]) })
        )
        // console.log(entries.items)
        commit('setPosts', entries.items)
        commit('setPagesTotal', Math.ceil(entries.total / PAGE))
        // commit('setPostsDate', countDate)
      })

    // await client
    //   .getEntries({
    //     content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    //     order: ORDER
    //   })
    //   .then((entries: any) => {
    //     const array: string[] = []
    //     entries.items.forEach(
    //       (item: {
    //         fields: { tags: { forEach: (arg0: (tag: any) => void) => void } }
    //       }) => {
    //         item.fields.tags.forEach((tag: string) => {
    //           array.push(tag)
    //         })
    //       }
    //     )

    //     commit(
    //       'setTags',
    //       array.filter((x, i, self) => {
    //         return self.indexOf(x) === i
    //       })
    //     )
    //   })
  },

  async initPostsDate({ commit }: ActionContext<State, RootState>) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER
        // skip: (state.page - 1) * PAGE,
        // limit: PAGE
      })
      .then((entries: any) => {
        const dateArray: string[] = []
        entries.items.forEach((item: any) => {
          const date = dayjs(item.sys.createdAt)
          dateArray.push(date.format('YYYY-MM'))
        })
        const counts: Dictionary<number> = {}
        for (let i = 0; i < dateArray.length; i++) {
          const key = dateArray[i]
          counts[key] = counts[key] ? counts[key] + 1 : 1
        }
        const countDate: Array<{ date: string; count: string }> = []
        Object.keys(counts).forEach((key) =>
          countDate.push({ date: key, count: String(counts[key]) })
        )
        commit('setPostsDate', countDate)
      })
  },
  async initPostCategory({ commit }: ActionContext<State, RootState>) {
    console.log(process.env.CTF_CATEGORY_TYPE_ID)
    await client
      .getEntries({
        content_type: process.env.CTF_CATEGORY_TYPE_ID
        // order: ORDER
        // skip: (state.page - 1) * PAGE,
        // limit: PAGE
      })
      .then((entries: any) => {
        const catArray: Dictionary<{
          id: string
          slug: string
          name: string
        }> = {}
        entries.items.forEach((item: any) => {
          catArray[item.fields.slug] = {
            id: item.sys.id,
            slug: item.fields.slug,
            name: item.fields.name
          }
        })

        console.log(catArray)
        commit('setCategories', catArray)
      })
  }
}

export interface RootActionTree<State, RootState>
  extends ActionTree<State, RootState> {
  nuxtServerInit(context: ActionContext<State, RootState>): Promise<void>
  initPosts(
    context: ActionContext<State, RootState>,
    params: Param
  ): Promise<void>
}

export const getters = {
  //
}

export const product: Module<State, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
