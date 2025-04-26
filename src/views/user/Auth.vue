<template>
  <div class="auth-container">
    <div class="auth-wrapper">
      <div class="auth-image">
        <!-- 这里可以放置图片内容 -->
      </div>
      
      <!-- 登录层 -->
      <transition name="fade" mode="out-in">
        <div v-if="activeLayer === 'login'" class="auth-form-container">
          <h2>{{ $t('auth.loginTitle') }}</h2>
          <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="auth-form">
            <div class="form-group">
              <BaseInput
                v-model="loginForm.account"
                :placeholder="$t('auth.accountPlaceholder')"
                prop="account"
                clearable
              />
            </div>
            <div class="form-group">
              <BaseInput
                v-model="loginForm.password"
                type="password"
                :placeholder="$t('auth.passwordPlaceholder')"
                prop="password"
                show-password
              />
            </div>

            <div class="form-options">
              <el-checkbox class="remember-me">{{ $t('auth.rememberMe') }}</el-checkbox>
              <div class="forgot-password" @click="handleForgotPassword">
                {{ $t('auth.forgotPassword') }}
              </div>
            </div>

            <CustomButton 
              type="primary"
              @click="handleLogin"
              class="auth-btn"
              size="large"
              :loading="loginLoading"
              text="auth.login"
            />

            <div class="divider">
              {{ $t('auth.orLoginWith') }}
            </div>

            <div class="social-login">
              <div class="social-icon">
                <i class="icon-wechat"></i>
              </div>
              <div class="social-icon">
                <i class="icon-qq"></i>
              </div>
              <div class="social-icon">
                <i class="icon-weibo"></i>
              </div>
            </div>

            <div class="switch-text" @click="switchToRegister">
              {{ $t('auth.noAccount') }} {{ $t('auth.registerNow') }}
            </div>
          </el-form>
        </div>
      </transition>

      <!-- 注册层 -->
      <transition name="fade" mode="out-in">
        <div v-if="activeLayer === 'register'" class="auth-form-container">
          <h2>{{ $t('auth.registerTitle') }}</h2>
          <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" class="auth-form">
            <div class="form-group">
              <BaseInput
                v-model="registerForm.account"
                :placeholder="$t('auth.accountPlaceholder')"
                prop="account"
                clearable
              />
            </div>
            <div class="form-group">
              <BaseInput
                v-model="registerForm.password"
                type="password"
                :placeholder="$t('auth.passwordPlaceholder')"
                prop="password"
                show-password
              />
            </div>
            <div class="form-group">
              <BaseInput
                v-model="registerForm.confirmPassword"
                type="password"
                :placeholder="$t('auth.confirmPassword')"
                prop="confirmPassword"
                show-password
              />
            </div>

            <div class="form-options">
              <el-checkbox class="remember-me">{{ $t('auth.agreeTerms') }}</el-checkbox>
            </div>

            <CustomButton 
              type="primary"
              @click="handleRegister"
              class="auth-btn"
              size="large"
              :loading="registerLoading"
              text="auth.register"
            />

            <div class="divider">
              {{ $t('auth.orRegisterWith') }}
            </div>

            <div class="social-login">
              <div class="social-icon">
                <i class="icon-wechat"></i>
              </div>
              <div class="social-icon">
                <i class="icon-qq"></i>
              </div>
              <div class="social-icon">
                <i class="icon-weibo"></i>
              </div>
            </div>

            <div class="switch-text" @click="switchToLogin">
              {{ $t('auth.haveAccount') }} {{ $t('auth.loginNow') }}
            </div>
          </el-form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { loginByPassword, register } from '@/api/auth/auth';
import stringUtils from '@/utils/string';
import BaseInput from '@/components/form/BaseInput.vue';
import CustomButton from '@/components/form/CustomButton.vue';

defineOptions({
  name: 'AuthPage'
});
    const { t } = useI18n();
    const router = useRouter();
    const activeLayer = ref('login');
    const loginLoading = ref(false);
    const registerLoading = ref(false);

    // 登录表单
    const loginForm = ref({
      account: '',
      password: '',
    });

    // 注册表单
    const registerForm = ref({
      account: '',
      password: '',
      confirmPassword: '',
    });

    // 表单验证规则
    const validateAccount = (rule, value, callback) => {
      if (stringUtils.isEmpty(value)) {
        callback(new Error(t('auth.validation.accountRequired')));
      } else if (!stringUtils.isEmail(value) && !stringUtils.isPhone(value)) {
        callback(new Error(t('auth.validation.accountInvalid')));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (stringUtils.isEmpty(value)) {
        callback(new Error(t('auth.validation.passwordRequired')));
      } else if (value.length < 6) {
        callback(new Error(t('auth.validation.passwordMinLength')));
      } else {
        callback();
      }
    };

    const loginRules = {
      account: [
        { required: true, validator: validateAccount, trigger: 'blur' }
      ],
      password: [
        { required: true, validator: validatePassword, trigger: 'blur' }
      ],
    };

    const validateConfirmPassword = (rule, value, callback) => {
      if (stringUtils.isEmpty(value)) {
        callback(new Error(t('auth.validation.confirmPasswordRequired')));
      } else if (value !== registerForm.value.password) {
        callback(new Error(t('auth.validation.passwordNotMatch')));
      } else {
        callback();
      }
    };

    const registerRules = {
      account: [
        { required: true, validator: validateAccount, trigger: 'blur' }
      ],
      password: [
        { required: true, validator: validatePassword, trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, validator: validateConfirmPassword, trigger: 'blur' }
      ],
    };

    // 切换层级
    const switchToRegister = () => {
      activeLayer.value = 'register';
    };

    const switchToLogin = () => {
      activeLayer.value = 'login';
    };

    // 处理登录
    const handleLogin = async () => {
      loginLoading.value = true;
      try {
        const res = await loginByPassword(loginForm.value);
        if (res && res.success) {
          ElMessage.success(t('auth.message.loginSuccess'));
          router.push('/');
        } else {
          ElMessage.error(res?.message || t('auth.message.loginFailed'));
        }
      } catch (error) {
        ElMessage.error(error.message || '登录失败');
      } finally {
        loginLoading.value = false;
      }
    };

    // 处理注册
    const handleRegister = async () => {
      registerLoading.value = true;
      try {
        await register(registerForm.value);
        ElMessage.success(t('auth.message.registerSuccess'));
        switchToLogin();
      } catch (error) {
        ElMessage.error(error.message || t('auth.message.registerFailed'));
      } finally {
        registerLoading.value = false;
      }
    };

    const handleForgotPassword = () => {
      ElMessage.info(t('auth.message.forgotPassword'));
    };

</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: white;
  overflow: hidden;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}

.auth-image {
  flex: 0 0 70%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
}

.auth-form-container {
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  transition: all 0.5s ease;
  overflow: hidden;
  
  @media screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    padding: 20px;
  }

  h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 28px;
    font-weight: 600;
    color: #333;
    
    @media screen and (max-width: 768px) {
      margin-bottom: 30px;
      font-size: 24px;
    }
  }

  .auth-form {
    width: 100%;
    max-width: 320px;
    
    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
    
    .form-group {
      margin-bottom: 20px;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
    }

    :deep(.el-input__wrapper) {
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      
      @media screen and (max-width: 768px) {
        padding: 14px 16px;
      }
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    margin: 8px 0 24px;

    .remember-me {
      color: #666;
      font-size: 14px;
    }

    .forgot-password {
      color: #409eff;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

    .divider {
      margin: 24px 0;
      text-align: center;
      color: #999;
      font-size: 14px;
      position: relative;
      background: white;
      padding: 0 10px;
      z-index: 1;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background: #eee;
        z-index: -1;
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }
    }

  .social-login {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;

    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #eaeaea;
      }
    }
  }
}


.auth-btn {
  width: 100%;
  max-width: 400px;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: #409eff;
  color: white;
  border: none;
  
  @media screen and (max-width: 768px) {
    padding: 18px;
    font-size: 18px;
  }

  &:hover {
    background: #66b1ff;
    box-shadow: 0 2px 12px rgba(64, 158, 255, 0.3);
  }

  &:active {
    background: #3a8ee6;
  }
}

.switch-text {
  text-align: center;
  margin-top: 16px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #409eff;
  }
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
