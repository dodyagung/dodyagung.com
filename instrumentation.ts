export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await require("@newrelic/next");
  }
}
