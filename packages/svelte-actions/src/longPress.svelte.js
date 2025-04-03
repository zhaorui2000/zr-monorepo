import { timer, fromEvent, merge, switchMap, takeUntil, filter } from 'rxjs';

export default function longPress(node, { longPress, duration = 700 } = {}) {
  let subscription;
  // 创建事件流：同时监听触摸和鼠标事件
  const startEvents = merge(
    fromEvent(node, 'touchstart'),
    fromEvent(node, 'mousedown')
  );
  const endEvents = merge(
    fromEvent(node, 'touchend'),
    fromEvent(node, 'mouseup'),
    fromEvent(node, 'touchcancel') // 处理触摸取消（如移动手指离开）
  );
  startEvents.pipe(
    switchMap(() => {
      // 创建计时器，当计时器完成时触发 longPress
      return timer(duration).pipe(
        takeUntil(endEvents.pipe(
          // 只处理属于当前开始事件的结束事件
          filter(() => true) // 这里可以添加条件，但简单情况下直接使用 takeUntil
        ))
      );
    })
  ).subscribe(() => {
    longPress?.(node);
  });
$effect(()=>{
  return () => {
    subscription?.unsubscribe();
  }
})
}