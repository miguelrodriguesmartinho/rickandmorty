<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './assets/tailwind.css'
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
</script>

<template>
  <header class="gAffOP">
    <nav class="navigationBar">
      <RouterLink to="/discovery">
        <img src="/favicon.png" alt="" class="logo">
      </RouterLink>
      <ul class="nav-list" style="width:100%">
        <li v-if="authStore.isAuthenticated" style="margin-right: auto;">
          <RouterLink to="/discovery">Discovery</RouterLink>
        </li>
        <li v-if="authStore.isAuthenticated" class="animate-message">
          <RouterLink to="/edituser">{{ authStore.loggedUser.username }}</RouterLink>
        </li>
        <li v-if="authStore.isAuthenticated" @click="authStore.logout()">
          <RouterLink to="/">Logout</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
.animate-message {
  background-image: linear-gradient(-225deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%,
      #fff800 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;
  font-size: 16px;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 0px;
}

/*!sc*/
body {
  background: white;
  font-variant-ligatures: none;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-text-decoration-skip-ink: auto;
  text-decoration-skip-ink: auto;
}

/*!sc*/
.navigationBar {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  min-height: 60px;
  // padding-bottom: 20px;
}


/*!sc*/
.nav-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0;
  margin: 0;
}

/*!sc*/
.nav-list li {
  margin: 0;
}

/*!sc*/
.nav-list li:not(:last-child) {
  margin-right: 1.75rem;
}


header {
  line-height: 1.5;
  max-height: 100vh;
}


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
  font-size: 1rem;

  &:hover {
    color: orange;
    text-decoration: underline;
  }
}
</style>
