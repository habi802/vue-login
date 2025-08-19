<script setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { login } from '@/services/accountService';

  const router = useRouter();

  const state = reactive({
    form: {
      loginId: '',
      loginPw: ''
    }
  });

  const submit = async () => {
    const res = await login(state.form);

    switch (res.status) {
      case 200:
        await router.push('/');
        break;
      case 404:
        alert('아이디/비밀번호를 확인해 주삼.')
        break;
    }
  };

  // 카카오 로그인 팝업 창을 여는 함수
  const loginWithKakao = () => {
    // 카카오 REST API 를 호출하기 위한 변수
    const clientId = import.meta.env.VITE_KAKAO_LOGIN_CLIENT_ID;
    const redirectUri = encodeURIComponent('http://localhost:8080/api/v1/account/login/kakao');
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    // 카카오 로그인 화면을 새 창으로 띄우기
    const kakaoWindow = window.open(
      kakaoAuthUrl,
      '카카오 로그인',
      'width=500,height=600,top=100,left=100'
    );

    const timer = setInterval(() => {
      try {
        if (kakaoWindow.location.href.includes('/kakao-login-success')) {
          const urlParams = new URL(kakaoWindow.location.href).searchParams;
          const memberId = urlParams.get('memberId');
          console.log('로그인 완료, memberId:', memberId);
          kakaoWindow.close();

          router.push('/');

          clearInterval(timer);
        }
      } catch (e) {
        console.log(e);
      }

      if (kakaoWindow.closed) {
        // 팝업 창 닫혔을 때(아무 일 일어나지 않음)
        clearInterval(timer);
      }
    }, 500);
  }

  // 네이버 로그인 팝업 창을 여는 함수
  const loginWithNaver = () => {
    const clientId = import.meta.env.VITE_NAVER_LOGIN_CLIENT_ID;
    const redirectUri = encodeURIComponent('http://localhost:8080/api/v1/account/login/naver');
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  
    // 카카오 로그인 화면을 새 창으로 띄우기
    const naverWindow = window.open(
      naverAuthUrl,
        '네이버 로그인',
        'width=500,height=600,top=100,left=100'
    );

    const timer = setInterval(() => {
      try {
        if (naverWindow.location.href.includes('/naver-login-success')) {
          const urlParams = new URL(naverWindow.location.href).searchParams;
          const memberId = urlParams.get('memberId');
          console.log('로그인 완료, memberId:', memberId);
          naverWindow.close();

          router.push('/');

          clearInterval(timer);
        }
      } catch (e) {
        console.log(e);
      }

      if (naverWindow.closed) {
        // 팝업 창 닫혔을 때(아무 일 일어나지 않음)
        clearInterval(timer);
      }
    }, 500);
  };
</script>

<template>
  <div class="login">
    <div class="container">
      <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
        <h1 class="h5 mb-3">로그인</h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="loginId" v-model="state.form.loginId" placeholder="이메일">
          <label for="loginId">이메일</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="loginPw" v-model="state.form.loginPw" placeholder="패스워드" autocomplete="off">
          <label for="loginPw">패스워드</label>
        </div>
        <button type="submit" class="w-100 h6 btn py-3 btn-primary">로그인</button>
      </form>
      <img src="@/assets/kakao_login.png" @click="loginWithKakao" class="mx-auto d-block login-btn" />
      <img src="@/assets/naver_login.png" @click="loginWithNaver" class="mx-auto d-block login-btn" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .join > .container {
    max-width: 576px;
  }

  .login-btn {
    cursor: pointer;
    width: 250px;
    height: 75px;
  }
</style>