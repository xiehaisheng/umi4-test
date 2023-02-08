import request from "@/utils/request";

export const getUserInfo = async () => {
    return request('/api/login/session', {
      method: 'get',
    });
  };