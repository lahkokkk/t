export async function onRequestGet(context) {
  // Mengambil URL dari environment variable yang akan kita set nanti
  const { env } = context;
  const jsonApiUrl = env.JSON_API_URL;

  // Jika environment variable tidak di-set, kirim error
  if (!jsonApiUrl) {
    return new Response(JSON.stringify({ error: "Environment variable JSON_API_URL tidak diatur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Mengambil data dari URL jsonbin-clone Anda
    const response = await fetch(jsonApiUrl);
    if (!response.ok) {
      throw new Error("Gagal mengambil data dari API eksternal");
    }

    const data = await response.json();

    // Mengembalikan data ke frontend
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
