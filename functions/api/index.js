export async function onRequestGet(context) {
  const { env } = context;

  try {
    const response = await fetch(env.JSON_API_URL);
    if (!response.ok) {
      throw new Error("Gagal mengambil data dari API eksternal");
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
