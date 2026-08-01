# Azul 算分器重构计划

## Context（背景）

`apps/board-game-tools/src/routes/azul` 是「花砖物语」墙面算分器。当前代码不只是「乱」，而是**全部文件语法损坏**：孤立行、缺失函数体、重复/缺失声明、未闭合标签、错误的 `each` 循环。例如 [store/index.js](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/store/index.js) 有孤立的 `decode:` 行和重复的 `IS_BLOCK`；[Bottom.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/modules/Bottom.svelte) 与 [MainFloor.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/modules/MainFloor.svelte) 缺失函数头；[+page.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/+page.svelte) 的 `StickyPanel` 闭合标签损坏。

目标：从残片重建为干净、可运行、符合最佳实践的代码，遵循项目既有约定（Svelte 5 runes、nanostores、`@zr/ui`、immer、`class-variance-authority`，参照 [agricola](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/agricola) 与 [latinSquare](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/latinSquare) 路由）。

### 用户确认的关键决策
1. **保留原始计分逻辑**：确认（Confirm）时逐格把半透明格转锁定格再计分（相邻半透明格不互计）——这是原行为，不改。仅做代码清理，不改计分语义。
2. **功能集合**：作弊模式（预览分）+ 重置 + 确认，**新增：撤销上 n 步**。
3. **Option.svelte**（损坏最严重）：重建为「作弊模式开关 + 重置按钮」。

### 应用语义（重建依据）
- 5×5 墙面网格。每格状态：`IS_BASE=0`（空）、`IS_TRANSLUCEN=-1`（预览/半透明）、`IS_BLOCK=1`（已锁定）。
- `arr` 存每格分数，`arrStatus` 存每格状态。
- 作弊模式（持久化）：空格显示「若放置可得几分」预览。
- 减分墙（MinueFloor）：7 个减分位 `[-1,-1,-2,-2,-2,-3,-3]`，勾选表示本回合占用。
- 确认：半透明格→锁定格并锁定分数，累加到当前分（含减分），再累加到总分；清空减分墙进入下回合。
- 撤销：回退最近一次确认（支持连续撤销 n 步）。

---

## 实现步骤

### 1. `store/index.js`（重建 + 新增 history/undo/reset）
- 常量：`IS_TRANSLUCEN = -1`、`IS_BASE = 0`、`IS_BLOCK = 1`、`BOARD_SIZE = 5`、`MINUS_ARRAY = [-1,-1,-2,-2,-2,-3,-3]`。
- `isCheatMode`：保留 `persistentAtom("azul-isCheatMode", false, {decode/encode})`。
- 工厂函数 `createInitArr()`（全 0 的 5×5）、`createInitStatus()`（全 `IS_BASE`）、`createInitMinus()`（全 false）。
- atoms：`arr`、`arrStatus`、`minusArrState`、`currentScore`、`totalScore`、`history`（会话内，不持久化）。
- 状态动作（放 store，因属状态操作）：
  - `clone2D(grid)` / `clone1D(arr)` 小工具（`row => [...row]`）。
  - `commitHistory()`：确认前压入当前快照 `{arr, arrStatus, minusArrState, currentScore, totalScore}`（深拷贝）。
  - `undo(n = 1)`：弹出 n 步，恢复到栈顶快照（栈空则恢复初始态）。
  - `resetGame()`：全部恢复初始态并清空 `history`。
- 移除损坏的孤立行/重复声明/未用 `produce` 导入。

### 2. `utils/calcCellScore.js`（重建为纯函数）
- 默认导出 `calcCellScore({ row, col, includeTranslucen = false })` → 返回分数，**不再副作用写 `arr`**（更干净；调用方负责写入，计分公式与原逻辑完全一致）。
- 内部 `_calcBase()`：`result = 1`（自身）+ 正交方向连续已填格数（遇空断开）；`validStatus = includeTranslucen ? [IS_BLOCK, IS_TRANSLUCEN] : [IS_BLOCK]`。
- 内部 `_calcSpecial()`：铺满行 +2、铺满列 +7、铺满同色（主对角 `(row+i)%len,(col+i)%len`）+10，用模运算检查「其余格是否全填」。
- 用 `BOARD_SIZE` 替代 `arr.get().length`。

### 3. `utils/calcAllScore.js`（重建）
- 导出 `calcAllScore(cheatMode)`：遍历所有 `IS_BASE` 格，`arr[row][col] = cheatMode ? calcCellScore({row,col,includeTranslucen:true}) : 0`。
- 用 `produce` 一次性更新 `arr`（避免循环内多次 set）。
- 语义：作弊开→算预览分；作弊关→清空预览分。

### 4. `components/Floor.svelte`（清理，原本基本完好）
- 保留 props：`onChange, className, isTranslucen, disable, children, checked=$bindable(false)`。
- 用 `cva` 把 on/off 两段重复的 Block 类抽成 `state` 变体（`off`=浅蓝渐变、`on`=深蓝渐变），`isTranslucen` → `opacity-50`，减少重复。

### 5. `modules/MainFloor.svelte`（重建）
- 5×5 `Floor` 网格：`{#each Array(BOARD_SIZE) as _, row}` 嵌套 col。
- 点击切换：非 `IS_BLOCK` 格在 `IS_TRANSLUCEN ↔ IS_BASE` 间切换（用 `produce` 更新 `arrStatus`）；`IS_BLOCK` 格 `disable`。
- 显示分数：`isCheatMode || arrStatus===IS_BLOCK` 时显示 `$arr[row][col]`。
- `$effect`：依赖 `$isCheatMode`、`$arrStatus`，调用 `calcAllScore($isCheatMode)` 重算预览分。

### 6. `modules/MinueFloor.svelte`（清理，原本基本完好）
- `MINUS_ARRAY.length` 个 `Floor`，`bind:checked={$minusArrState[index]}`，`onChange` 用 `produce` 更新。
- 仅做格式/命名清理。

### 7. `modules/Bottom.svelte`（重建 + 撤销）
- `calcMinusScore()`：`MINUS_ARRAY` 中勾选项求和（保留原逻辑）。
- `calcTranslucenScore()`：**保留原始逐格逻辑**——遍历半透明格，`score = calcCellScore({row,col})`（`includeTranslucen` 默认 false，即相邻半透明格不互计），写 `arr` 并把该格 `arrStatus` 置 `IS_BLOCK`，累加 `score`；返回 `累加分 + calcMinusScore()`。
- `handleConfirm()`：`commitHistory()` → `currentScore = calcTranslucenScore()` → `totalScore += currentScore` → 重置 `minusArrState`（清空减分墙进入下回合）。
- **撤销按钮**：`undo(1)`，显示「可撤销 {historyLength} 步」，`history` 为空时禁用。连续点击即撤销 n 步。

### 8. `modules/Option.svelte`（重建）
- 作弊模式 `Checkbox`（`bind:checked={$isCheatMode}`，持久化）。
- 重置 `Button`：`resetGame()`（替代原 `location.reload()`，可被撤销体系感知且不刷页面）。

### 9. `modules/ScoreMessage.svelte`（基本不动）
- 展示 `currentScore`、`totalScore`（`Badge`）。仅格式清理。

### 10. `+page.svelte`（修复布局）
- `Container` 用 `{#snippet children({ stickyClass })}` 模式（原已正确）。
- 结构：`Option` → `MainFloor` → `Divider` → `MinueFloor` → `StickyPanel`（内含 `ScoreMessage` + `Bottom`）。
- 修复损坏的 `StickyPanel` 双 children / 错误闭合，改为单一正确用法。

---

## 关键文件
- [store/index.js](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/store/index.js)
- [utils/calcCellScore.js](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/utils/calcCellScore.js)
- [utils/calcAllScore.js](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/utils/calcAllScore.js)
- [components/Floor.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/components/Floor.svelte)
- [modules/MainFloor.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/modules/MainFloor.svelte)
- [modules/MinueFloor.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/modules/MinueFloor.svelte)
- [modules/Bottom.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/modules/Bottom.svelte)
- [modules/Option.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/modules/Option.svelte)
- [modules/ScoreMessage.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/modules/ScoreMessage.svelte)
- [+page.svelte](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/azul/+page.svelte)

## 复用的既有依赖
- `@nanostores/persistent`、`nanostores`（共享状态，参照 [agricola/store](file:///Users/rui/Documents/project/zr-monorepo/apps/board-game-tools/src/routes/agricola/store/index.js)）
- `immer` 的 `produce`（不可变更新）
- `@zr/ui`：`Container`（snippet children 模式）、`StickyPanel`、`Divider`、`Checkbox`、`Button`、`Badge`、`Swap`、`Block`
- `class-variance-authority` 的 `cx`/`cva`

## 验证方式
1. 启动开发服务器，进入 `/azul`：
   - 开作弊模式：空格应显示预览分（孤立格=1，相邻预览格累加，铺满行/列/对角显示 +2/+7/+10 加成）。
   - 点击若干格变半透明 → 确认：半透明格变锁定、当前分=该批格分+减分、总分累加、减分墙清空。
   - 点撤销：回退最近一次确认（半透明格恢复、分数回退），可连点多次。
   - 重置：全部归零。
2. 切换作弊开关：空格预览分相应出现/消失。
3. `pnpm lint` / 类型检查（若项目配置）通过，无控制台报错。
