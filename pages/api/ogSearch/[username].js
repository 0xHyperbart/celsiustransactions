import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req, res) {
  const parts = req.nextUrl.pathname.split("/");
  const username = decodeURIComponent(parts[parts.length - 1]);

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
        <div style={{ display: "flex", fontSize: 64 + 8 }}>
          Search Celsius Transactions
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: "30px" }}>
          See '{username}' transactions
        </div>
        <div style={{ display: "flex", marginTop: "90px" }}>
          <div
            style={{
              display: "flex",
              border: "1px solid #ccc",
              width: "600px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 32,
                color: "grey",
                padding: "0px 20px",
              }}
            >
              Username or address
            </div>
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid #ccc",
              borderLeft: "none",
              backgroundColor: "#ffca42",
            }}
          >
            <div style={{ display: "flex", fontSize: 32, padding: "0px 40px" }}>
              Search
            </div>
          </div>
        </div>
      </div>
    )
  );
}
