<template>
  <section class="wrapper">
    <form class="login-modal">
      <label class="login-lbl"><strong>Login</strong></label>
      <div class="input-group">
        <div class="bubble-input">
          <input type="email" placeholder="Username">
        </div>
        <div class="bubble-input">
          <input type="password" placeholder="Password">
        </div>
        <div class="remember-wrapper">
          <div>
            <input type="checkbox" name="rememberUser">
            <label for="rememberUser">Remember me</label>
          </div>
          <a href="https://google.com">Forgot password?</a>
        </div>
      </div>
      <button>
        <strong>Log in</strong>
      </button>
      <div style="margin-top: 20px;">
        Dont have an account? <a href="https://google.com">Create</a>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "LoginView"
}
</script>

<style lang="scss">
body {
  @extend .animated;
  background-image: linear-gradient(155deg, #ff49fd, #6200ff, #ff0052);
  font-family: Lato;
  font-size: 14px;
  background-size: 400% 400%;
}

a {
  margin-bottom: 0;
  text-decoration: 0;
  color: black;
}

.animated {
  animation: gradient 25s ease infinite;
}

.bubble-input {
  display: flex;
  border-radius: 20px;
  height: 40px;
  width: 100%;
  box-shadow: #c5c5c5 1px -1px 20px 0px;

  input {
    margin-left: 20px;
    border: none;
    font-size: 15px;
    width: min-content;
    outline: none !important;
  }
}

.wrapper {
  @extend body;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.remember-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: -10px;
  position: relative;

div {
  display: flex;
  align-items: center;
}
}

.login-modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 340px;
  background-color: white;
  border-radius: 5px;
  box-shadow: #6a6a6a 1px -1px 20px 0px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 70%;
}

button {
  @extend .animated;

  width: 150px;
  height: 35px;
  font-size: large;
  border: none;
  background-image: linear-gradient(155deg, #ff49fd, #6200ff, #ff0052);
  background-size: 2000% 2000%;
  border-radius: 20px;
  color: white;
  font-family: inherit;
}

.login-lbl {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  font-size: x-large;
  padding: 5px;
  border-radius: 5px;
  width: 80px;
  height: 30px;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

</style>