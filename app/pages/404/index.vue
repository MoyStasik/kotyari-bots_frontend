<template>
  <div :class="$style.container">
    <div :class="$style.card">
      <div :class="$style.iconWrapper">
        <div :class="$style.circle">
          <Search :class="$style.searchIcon" :size="48" stroke-width="2.5" />
          <X :class="$style.xIcon" :size="20" stroke-width="4" />
        </div>
        <div :class="$style.badge">
          <Bot :size="20" color="white" />
        </div>
      </div>

      <h1 :class="$style.title">404 - Страница не найдена</h1>
      <p :class="$style.description">
        К сожалению, запрашиваемая страница не существует или была перемещена.
      </p>

      <div :class="$style.reasonsBox">
        <h3 :class="$style.reasonsTitle">Возможные причины:</h3>
        <ul :class="$style.reasonsList">
          <li>Неправильно введён адрес страницы</li>
          <li>Страница была удалена или перемещена</li>
          <li>Ссылка устарела или повреждена</li>
        </ul>
      </div>

      <div :class="$style.actions">
        <button :class="$style.btnPrimary" @click="handleError">
          <Home :size="18" />
          <span>На главную</span>
        </button>

        <button :class="$style.btnSecondary" @click="goBack">
          <ArrowLeft :size="18" />
          <span>Назад</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, X, Bot, Home, ArrowLeft } from 'lucide-vue-next';

const handleError = () => clearError({ redirect: '/' });
const goBack = () => useRouter().back();

if (import.meta.server) {
  const event = useRequestEvent();
  if (event) {
    setResponseStatus(event, 404);
  }
}
</script>

<style module lang="scss">
$bg-color: #f4f6f9;
$card-bg: #ffffff;
$text-main: #111827;
$text-secondary: #6b7280;
$icon-circle-bg: #fce7e9;
$icon-color: #dc2626;
$badge-bg: #0b0f19;
$btn-primary-bg: #0b0f19;
$btn-hover: #1f2937;
$border-color: #e5e7eb;

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  align-items: center;
  justify-content: center;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.card {
  background: $card-bg;
  border-radius: 16px;
  padding: 48px;
  max-width: 560px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  text-align: center;
}

// Секция иконок
.iconWrapper {
  position: relative;
  width: 96px;
  height: 96px;
  margin: 0 auto 32px;
}

.circle {
  width: 100%;
  height: 100%;
  background-color: $icon-circle-bg;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $icon-color;
  position: relative;
}

.searchIcon {
  // Немного смещаем, чтобы было похоже на лупу
  transform: translate(-2px, -2px);
}

.xIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-65%, -65%); // Центрируем внутри лупы
}

.badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background-color: $badge-bg;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid $card-bg;
}

// Тексты
.title {
  font-size: 28px;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 16px;
  line-height: 1.2;
}

.description {
  font-size: 16px;
  color: $text-secondary;
  line-height: 1.5;
  margin-bottom: 32px;
}

// Блок причин
.reasonsBox {
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  margin-bottom: 32px;
}

.reasonsTitle {
  font-size: 16px;
  font-weight: 600;
  color: $text-main;
  margin-bottom: 12px;
}

.reasonsList {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 8px;
    font-size: 14px;
    color: $text-secondary;

    &:last-child {
      margin-bottom: 0;
    }

    // Красная точка (буллит)
    &::before {
      content: '';
      position: absolute;
      left: 6px;
      top: 9px;
      width: 4px;
      height: 4px;
      background-color: $icon-color;
      border-radius: 50%;
    }
  }
}

// Кнопки
.actions {
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.btnBase {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.btnPrimary {
  @extend .btnBase;
  background-color: $btn-primary-bg;
  color: white;
  border: 1px solid transparent;

  &:hover {
    background-color: $btn-hover;
  }
}

.btnSecondary {
  @extend .btnBase;
  background-color: white;
  color: $text-main;
  border: 1px solid $border-color;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
}
</style>
