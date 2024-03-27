<template>
  <main class="app-container">
    <h1 class="app-title">
      Provis
    </h1>
    <RouterView />
  </main>
</template>

<style>
#app {
  padding: 36px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #fef6e4;
}

.app-container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  height: 100%;
}

.app-title {
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 3rem;
  color: #001858;
}
</style>
