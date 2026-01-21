<template>
  <div :class="$style.PageWrapper">
    <div :class="$style.card">
      <div :class="$style.header">
        <div :class="$style.logoCircle">
          <Bot color="white" :size="28" :stroke-width="1.5" />
        </div>
        <h1 :class="$style.title">Вход в админку</h1>
        <p :class="$style.subtitle">Войдите в систему управления бот-фермой</p>
      </div>

      <form :class="$style.form" @submit.prevent="handleSubmit">

        <!-- БЛОК ОШИБКИ СЕРВЕРА -->
        <div v-if="serverError" :class="$style.serverErrorAlert">
          {{ serverError }}
        </div>

        <!-- Input: Email -->
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
              :class="[$style.input, (errors.email || serverError) && $style.inputError]"
              @input="clearErrors"
            />
          </div>
          <span v-if="errors.email" :class="$style.errorText">{{ errors.email }}</span>
        </div>

        <!-- Input: Password -->
        <div :class="$style.inputGroup">
          <label :class="$style.label">Пароль</label>
          <div :class="$style.inputWrapper">
            <span :class="$style.iconLeft">
              <Lock :size="18" color="#9ca3af" :stroke-width="1.5" />
            </span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Пароль"
              :class="[$style.input, (errors.password || serverError) && $style.inputError]"
              @input="clearErrors"
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
          <span v-if="errors.password" :class="$style.errorText">{{ errors.password }}</span>
        </div>

        <button type="submit" :class="$style.submitButton">Войти</button>
      </form>

      <div :class="$style.footer">
        <span>Нет аккаунта? </span>
        <NuxtLink to="/signup" :class="$style.link">Зарегистрироваться</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Bot, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next';
import { useUserStore } from '~/store/user/user';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const serverError = ref(''); // Состояние для ошибки от бэкенда

const errors = reactive({
  email: '',
  password: ''
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Очистка ошибок при вводе
const clearErrors = () => {
  errors.email = '';
  errors.password = '';
  serverError.value = '';
};

const validate = () => {
  let isValid = true;
  errors.email = '';
  errors.password = '';

  const emailRegex = /^.+@.+\..+$/;
  if (!emailRegex.test(email.value)) {
    errors.email = 'Введите корректный email';
    isValid = false;
  }

  if (password.value.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  serverError.value = ''; // Сброс ошибки перед запросом
  if (!validate()) return;

  try {
    const response = await userStore.loginUser({
      email: email.value,
      password: password.value,
    });

    if (response) {
      router.push('/');
    }
  } catch (err: any) {
    console.error(err);

    // Получаем код ошибки (поддержка axios/fetch структур)
    const status = err.response?.status || err.statusCode || err.status;

    if (status === 404) {
      serverError.value = 'Неправильный email или пароль';
    } else {
      serverError.value = 'Произошла ошибка. Попробуйте еще раз';
    }
  }
};
</script>

<style module lang="scss">
/* Основные стили (без изменений) */
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
  font-family: var(--base_ui-sans-typography);
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  font-family: var(--base_ui-sans-typography);
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
  font-family: var(--base_ui-sans-typography);
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
  font-family: var(--base_ui-sans-typography);
}

.link {
  color: #111827;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

/* --- СТИЛИ ВАЛИДАЦИИ И ОШИБОК --- */
.inputError {
  border-color: #ef4444 !important;
  background-color: #fef2f2 !important;

  &:focus {
    box-shadow: 0 0 0 1px #ef4444 !important;
  }
}

.errorText {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 6px;
  font-family: var(--base_ui-sans-typography);
}

.serverErrorAlert {
  padding: 12px;
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 4px;
  font-family: var(--base_ui-sans-typography);
}
</style>
