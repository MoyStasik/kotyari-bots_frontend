<template>
  <div
    :class="$style.PageWrapper"
  >
    <div :class="$style.card">
      <div :class="$style.header">
        <div :class="$style.logoCircle">
          <Bot color="white" :size="28" :stroke-width="1.5" />
        </div>
        <h1 :class="$style.title">Регистрация</h1>
        <p :class="$style.subtitle">Создайте новый аккаунт</p>
      </div>

      <form
        :class="$style.form"
        @submit.prevent="handleSubmit"
      >

        <div :class="$style.inputGroup">
          <label :class="$style.label">Имя</label>
          <div :class="$style.inputWrapper">
            <span :class="$style.iconLeft">
              <User :size="20" color="#9ca3af" :stroke-width="1.5" />
            </span>
            <input
              v-model="name"
              type="text"
              placeholder="Иван Иванов"
              :class="$style.input"
            />
          </div>
        </div>

        <div :class="$style.inputGroup">
          <label :class="$style.label">Email</label>
          <div :class="$style.inputWrapper">
            <span :class="$style.iconLeft">
              <Mail :size="20" color="#9ca3af" :stroke-width="1.5" />
            </span>
            <input
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              :class="$style.input"
            />
          </div>
        </div>

        <div :class="$style.inputGroup">
          <label :class="$style.label">Пароль</label>
          <div :class="$style.inputWrapper">
            <span :class="$style.iconLeft">
              <Lock :size="18" color="#9ca3af" :stroke-width="1.5" />
            </span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              :class="$style.input"
            />
            <button
              type="button"
              :class="$style.iconRight"
              @click="togglePassword"
            >
              <component
                :is="showPassword ? Eye : EyeOff"
                :size="20"
                color="#9ca3af"
                :stroke-width="1.5"
              />
            </button>
          </div>
          <p :class="$style.hint">Минимум 6 символов</p>
        </div>

        <button type="submit" :class="$style.submitButton">Зарегистрироваться</button>
      </form>

      <div :class="$style.footer">
        <span>Уже есть аккаунт? </span>
        <NuxtLink to="/login" :class="$style.link">Войти</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bot, User, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next';
import { useUserStore } from '~/store/user/user';

const userStore = useUserStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  try {
    const response = await userStore.registerUser({
      username: name.value,
      email: email.value,
      password: password.value,
    });

    if (response) {
      router.push('/');
    }
  } catch (err) {
    console.error(err);
  }
};
</script>

<style module lang="scss">
.PageWrapper.PageWrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  align-items: center;
  justify-content: center;
  display: flex;
}

.card {
  background: #ffffff;
  width: 100%;
  max-width: 440px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  text-align: center;
}

.header {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logoCircle {
  width: 48px;
  height: 48px;
  background-color: #050810;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inputGroup {
  text-align: left;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 8px;
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  font-size: 14px;
  color: #111827;
  background-color: #f3f4f6;
  border: 1px solid transparent;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    background-color: #ffffff;
    border-color: #050810;
    box-shadow: 0 0 0 1px #050810;
  }
}

.iconLeft {
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.iconRight {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }
}

.hint {
  font-size: 12px;
  color: #6b7280;
  margin: 6px 0 0 0;
}

.submitButton {
  width: 100%;
  padding: 12px;
  background-color: #050810;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.footer {
  margin-top: 24px;
  font-size: 14px;
  color: #6b7280;
}

.link {
  color: #111827;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
