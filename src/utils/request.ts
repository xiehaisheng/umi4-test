import { message, notification } from "antd";
import { history } from "umi";
import { extend } from "umi-request";
const list = ["/api/datastore/getRelationData"];

const codeMessage: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
  411: "设置密码已超过30天，请更新密码！",
};
/**
 * 异常处理程序
 */

const errorHandler = (error: { response: any }) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    // const errorText = response.statusText;

    const { status } = response;
    message.error(errorText);
    if (status === 401 || status === 411) {
      history.push("/login");
    }
  } else if (!response) {
    notification.error({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */
let showErr = false;
// let u = "";
const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: "include", // 默认请求是否带上cookie
});
// 拦截器
request.interceptors.request.use((url: string, options?: any): object => {
  const { showPublicErr = true } = options;
  showErr = showPublicErr;
  // u = url;
  return {
    url,
    options: { ...options },
  };
});

request.interceptors.response.use(async (response) => {
  const { url } = response;
  const urlIndex = list.findIndex((item) => url.indexOf(item) !== -1);
  try {
    const data = await response.clone().json();
    if (!data.success && data.err && showErr && urlIndex === -1) {
      message.warning(data.err.msg);
    }
    if (urlIndex > -1 && !data.success) {
      return { ...response, hideNode: true };
    }
  } catch (e) {
    console.log(e);
  }

  return response;
});

export default request;
