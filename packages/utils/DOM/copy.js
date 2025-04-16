export default async function copy(content) {
  return new Promise((resolve, reject) => {
    navigator.clipboard
      .writeText(content)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error("@utils:copu error", err);
        reject(err);
      });
  });
}
