import { onMount, onDestroy } from "svelte";
import { timer } from "rxjs";
import { takeUntil, take } from "rxjs/operators"; // take(1) 用于只触发一次

export default function countDown(
  node,
  { onCountdownEnd, duration = 700 } = {},
) {
  let subscription;

  onMount(() => {
    if (duration === 0) {
      return;
    }
    // 创建计时器 Observable，在 duration 毫秒后发出值
    const countdown$ = timer(duration);

    // 订阅计时器，完成后执行回调
    subscription = countdown$
      .pipe(
        take(1), // 确保只执行一次
        // 如果需要在组件销毁前取消倒计时，可以添加 takeUntil(destroy$)
      )
      .subscribe(() => {
        onCountdownEnd?.();
      });

    // 返回清理函数（可选，onDestroy 也会处理）
    return () => {
      subscription?.unsubscribe();
    };
  });

  // 使用 onDestroy 确保组件销毁时取消订阅
  onDestroy(() => {
    subscription?.unsubscribe();
  });
}
