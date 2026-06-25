const http = require("http");
const { randomUUID } = require("crypto");
const { URL } = require("url");
const { sections, badgeLabels } = require("./data/menu");

const PORT = Number(process.env.PORT || 4000);
const orders = [];

const sendJson = (res, status, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Payload is too large"));
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });

const normalize = (value) => String(value || "").trim().toLowerCase();

const findSection = (value) => {
  const target = normalize(value);
  return sections.find((section) => section.id === target || section.slug === target);
};

const getStats = () => {
  const items = sections.flatMap((section) =>
    section.categories.flatMap((category) => category.items)
  );

  return {
    sections: sections.length,
    categories: sections.reduce((sum, section) => sum + section.categories.length, 0),
    items: items.length,
    minPrice: Math.min(...items.map((item) => item.price)),
    maxPrice: Math.max(...items.map((item) => item.price)),
  };
};

const searchItems = (query) => {
  const target = normalize(query);

  if (!target) {
    return [];
  }

  return sections.flatMap((section) =>
    section.categories.flatMap((category) =>
      category.items
        .filter((item) =>
          [item.name, item.description, item.pair, category.title, section.title]
            .join(" ")
            .toLowerCase()
            .includes(target)
        )
        .map((item) => ({
          ...item,
          sectionId: section.id,
          sectionTitle: section.title,
          categoryId: category.id,
          categoryTitle: category.title,
        }))
    )
  );
};

const routes = {
  "GET /api/health": (_req, res) => {
    sendJson(res, 200, {
      ok: true,
      service: "soulist-menu-api",
      stats: getStats(),
      orders: orders.length,
    });
  },
  "GET /api/menu": (_req, res) => {
    sendJson(res, 200, { sections, badgeLabels, stats: getStats() });
  },
  "GET /api/featured": (_req, res) => {
    const featured = sections.flatMap((section) =>
      section.categories.flatMap((category) =>
        category.items
          .filter((item) => item.badges.includes("hit") || item.badges.includes("new"))
          .map((item) => ({
            ...item,
            sectionId: section.id,
            sectionTitle: section.title,
            categoryTitle: category.title,
          }))
      )
    );

    sendJson(res, 200, { items: featured });
  },
  "GET /api/orders": (_req, res) => {
    sendJson(res, 200, { orders });
  },
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const routeKey = `${req.method} ${url.pathname}`;

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (routes[routeKey]) {
    routes[routeKey](req, res, url);
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/menu/")) {
    const section = findSection(decodeURIComponent(url.pathname.replace("/api/menu/", "")));

    if (!section) {
      sendJson(res, 404, { message: "Раздел меню не найден" });
      return;
    }

    sendJson(res, 200, { section, badgeLabels });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/search") {
    sendJson(res, 200, { items: searchItems(url.searchParams.get("q")) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/orders") {
    try {
      const payload = await readBody(req);
      const items = Array.isArray(payload.items) ? payload.items : [];

      if (!items.length) {
        sendJson(res, 400, { message: "Добавьте позиции в заказ" });
        return;
      }

      const order = {
        id: randomUUID(),
        table: String(payload.table || "digital-menu"),
        comment: String(payload.comment || ""),
        items,
        total: Number(payload.total || 0),
        createdAt: new Date().toISOString(),
        status: "new",
      };

      orders.unshift(order);
      sendJson(res, 201, { order });
    } catch (error) {
      sendJson(res, 400, { message: "Некорректный JSON", details: error.message });
    }

    return;
  }

  sendJson(res, 404, { message: "API route not found" });
});

server.listen(PORT, () => {
  console.log(`Soulist menu API: http://localhost:${PORT}`);
});
