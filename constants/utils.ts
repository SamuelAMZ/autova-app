import Toast from "react-native-toast-message";

export function thousandSeparator(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const toastify = (title: string, body: string) => {
  return Toast.show({
    type: "error",
    text1: title,
    text2: body,
    position: "top",
  });
};

export function debounce(func: any, timeout = 500) {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
