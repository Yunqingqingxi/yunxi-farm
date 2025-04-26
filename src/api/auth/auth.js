import request from '@/utils/request';

export const loginByPassword = async data => {
  const res = await request.post('/auth/login/password', data);
  return {
    success: res.code === 200,
    message: res.message || '',
    data: res.data || null,
  };
};
export const loginByCode = data => request.post('/auth/login/code', data);
export const sendLoginCode = account => request.post('/auth/code/login', { account });
export const sendRegisterCode = data => request.post('/auth/code/register', data);
export const register = data => request.post('/auth/register', data);
