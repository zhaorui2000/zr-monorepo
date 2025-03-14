import { fromEvent, merge,map, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

export default function useClickAnywhere(callback, options = {}) {
  const {
    debounce = 300,      // 防抖时间（毫秒）
    excludeSelector = null // 排除元素选择器
  } = options;

  let isActive = $state(false);
  let subscription = $state(null);

  // 创建 RxJS 事件流
  const createEventStream = () => {
    const click$ = fromEvent(document, 'click');
    const touch$ = fromEvent(document, 'touchstart').pipe(
      // 转换 touch 事件为兼容格式
      map(event => ({
        ...event,
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY
      }))
    );

    return merge(click$, touch$).pipe(
      debounceTime(debounce),
      filter(event => {
        // 排除指定元素
        if (excludeSelector && event.target.closest(excludeSelector)) {
          return false;
        }
        return true;
      })
    );
  };

  const startListen = () => {
    if (!subscription) {
      subscription = createEventStream().subscribe(event => {
        callback(event);
      });
      isActive = true;
    }
  };

  const stopListen = () => {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
      isActive = false;
    }
  };

  // 自动清理
  $effect(() => {
    startListen();
    return () => stopListen();
  });

  return { startListen, stopListen }
};