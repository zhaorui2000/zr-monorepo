export default async function copy(content) {
  // 复制到剪贴板
  let result;
  try {
    result = await navigator.clipboard.writeText(content);
  } catch (err) {
    console.error("@utils:clipText error", err);
  }
  return result;
}
