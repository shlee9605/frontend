<template>
  <div>
    <h1 style="margin-left: 2%">유저 조회</h1>
    <div class="search-engine">
      <input
        class="form-control"
        type="text"
        name="아이디"
        v-model="Search.userid"
        autofocus
        placeholder="아이디"
      />
      <input
        class="form-control"
        type="text"
        name="이름"
        v-model="Search.name"
        autofocus
        placeholder="이름"
      />
      <form style="margin-left: 2%;" type="submit" @submit.prevent="searchUserList">
        <button class="btn-success" type="submit">Search</button>
      </form>
      <!-- <p class="loading" v-if="loading">검색 중입니다...</p> -->
    </div>
    <table class="table">
      <tr>
        <td class="table-section">아이디</td>
        <td class="table-section">이름</td>
        <td class="table-section">파</td>
        <td class="table-section">나이</td>
        <td class="table-section">이메일</td>
        <td class="table-section">생성일자</td>
      </tr>
      <tr v-for="user in userList" :key="user.id">
        <td class="table-section">{{user.userid}}</td>
        <td class="table-section">{{user.name}}</td>
        <td class="table-section">{{user.role}}</td>
        <td class="table-section">{{user.age}}</td>
        <td class="table-section">{{user.email}}</td>
        <td class="table-section">{{user.createdAt}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "이름" },
        { key: "userid", label: "아이디" },
        { key: "age", label: "나이" },
        { key: "role", label: "권한" },
        { key: "email", label: "이메일" },
        { key: "createdAt", label: "생성일" }
      ],
      Search: {
        name: null,
        userid: null,
      },
    };
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
  },
  created() {
    this.searchUserList()
  },
  methods: {
    searchUserList() {
      this.$store.dispatch('actUserList', this.Search)
    },
  }
};
</script>

<style src="../assets/style/user.css" scoped></style>
