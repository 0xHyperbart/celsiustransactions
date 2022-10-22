import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req, res) {
  const parts = req.nextUrl.pathname.split("/");
  const username = decodeURIComponent(parts[parts.length - 1]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const response = await fetch(`http://127.0.0.1:3000/api/loss/${username}`);
  const { total } = await response.json();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "60px",
          background: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 64 }}>{username} lost</div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: "bold",
            color: "#8a6300",
          }}
        >
          {formatter.format(total)}
        </div>
        <div style={{ display: "flex", fontSize: 64 }}>in Celsius</div>
        <div style={{ display: "flex", fontSize: 32, marginTop: "50px" }}>
          See break down on celsiustransactions.com
        </div>
      </div>
    )
  );
}
