import { onMount, onDestroy } from "svelte";
import { animationFrameScheduler } from "rxjs";
import { Observable } from "rxjs";
import { startWith } from "rxjs/operators";

export default function countDown(
  node,
  { onTick, onCountdownEnd, duration = 700, setController } = {},
) {
  let subscription;
  let startTime = null;
  let pausedTime = 0; // 累计暂停时间
  let isPaused = false;
  let isFinished = false;
  let remainingAtPause = 0;

  const createCountdown$ = () => {
    return new Observable((observer) => {
      const tick = () => {
        if (isPaused || isFinished) return;

        const now = performance.now();
        const elapsed = now - startTime - pausedTime;
        let remaining = Math.max(0, duration - elapsed);

        observer.next(remaining);

        if (remaining <= 0) {
          observer.complete();
        } else {
          animationFrameScheduler.schedule(tick);
        }
      };

      startTime = performance.now();
      animationFrameScheduler.schedule(tick);

      return () => { };
    });
  };

  // 初始化订阅
  const startCountdown = () => {
    if (subscription) subscription.unsubscribe();
    isFinished = false;

    subscription = createCountdown$()
      .pipe(startWith(duration))
      .subscribe({
        next: (remaining) => {
          onTick?.(remaining);
        },
        complete: () => {
          onTick?.(0);
          onCountdownEnd?.();
          isFinished = true;
        },
      });
  };

  // 暴露控制器
  const controller = {
    pause() {
      if (isPaused || isFinished) return;
      isPaused = true;
      remainingAtPause =
        duration - (performance.now() - startTime - pausedTime);
    },

    resume() {
      if (!isPaused || isFinished) return;
      isPaused = false;
      pausedTime +=
        performance.now() - (startTime + (duration - remainingAtPause));
      startCountdown(); // 重新订阅，从暂停处继续
    },

    restart(newDuration = duration) {
      if (isFinished) return;
      duration = newDuration;
      pausedTime = 0;
      isPaused = false;
      isFinished = false;
      startCountdown();
    },

    finish() {
      if (isFinished) return;
      isFinished = true;
      if (subscription) subscription.unsubscribe();
      onTick?.(0);
      onCountdownEnd?.();
    },
  };

  onMount(() => {
    if (duration <= 0) {
      isFinished = true;
      setController(controller);
      return;
    }
    startCountdown();
    setController(controller);
  });

  onDestroy(() => {
    if (subscription) subscription.unsubscribe();
  });
}
