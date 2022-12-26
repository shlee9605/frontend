import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  User: {
    id: null,
    name: null,
    userid: null,
    password: null,
    role: null,
    email: null,
    age: null,
    createdAt: null
  }
}

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    SignUpResult: null,
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    SignUpResult: state => state.SignUpResult,
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setSignUpResult(state, data) {
      state.SignUpResult = data
    },
  },
  actions: {
    // 리스트 조회
    actUserList(context, payload) {
      /* RestAPI 호출 */
      api
        .get('/serverApi/users/all', { params: payload })
        .then(response => {
          const userList = response && response.data && response.data.rows
          context.commit('setUserList', userList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserList.error', error)
          context.commit('setUserList', [])
        })
    },

    // 로그인페이지에서 회원가입
    actUserSignUp(context, payload) {
      context.commit('setSignUpResult', null)

      /* RestAPI 호출 */
      api
        .post('/serverApi/users', payload)
        .then(response => {
          const SignUpResult = response && response.data && response.data.id
          context.commit('setSignUpResult', SignUpResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserSignUp.error', error)
          context.commit('setSignUpResult', -1)
        })
    },
  }
}
