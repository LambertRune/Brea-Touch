/**
 * One-time Directus schema + permissions setup for Brea-Touch.
 * Usage: DIRECTUS_ADMIN_EMAIL=... DIRECTUS_ADMIN_PASSWORD=... node scripts/setup-directus.mjs
 */

const BASE =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://dbbreatouch.phiosk.be";
const EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || "admin@example.com";
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || "d1r3ctu5";

async function api(path, { method = "GET", token, body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function login() {
  const { data } = await api("/auth/login", {
    method: "POST",
    body: { email: EMAIL, password: PASSWORD },
  });
  return data.access_token;
}

async function ensureCollection(token, collection, meta = {}) {
  try {
    await api(`/collections/${collection}`, { token });
    console.log(`  · collection exists: ${collection}`);
  } catch {
    await api("/collections", {
      method: "POST",
      token,
      body: {
        collection,
        meta: {
          accountability: "all",
          ...meta,
        },
        schema: {},
        fields: [
          {
            field: "id",
            type: "integer",
            meta: { hidden: true, readonly: true, interface: "input", special: null },
            schema: { is_primary_key: true, has_auto_increment: true },
          },
        ],
      },
    });
    console.log(`  + collection created: ${collection}`);
  }
}

async function ensureField(token, collection, fieldDef) {
  try {
    await api(`/fields/${collection}/${fieldDef.field}`, { token });
    console.log(`    · field exists: ${fieldDef.field}`);
  } catch {
    await api(`/fields/${collection}`, {
      method: "POST",
      token,
      body: fieldDef,
    });
    console.log(`    + field: ${fieldDef.field}`);
  }
}

const statusField = {
  field: "status",
  type: "string",
  meta: {
    interface: "select-dropdown",
    options: {
      choices: [
        { text: "Published", value: "published" },
        { text: "Draft", value: "draft" },
      ],
    },
    width: "half",
  },
  schema: { default_value: "draft", is_nullable: false },
};

async function setupSchema(token) {
  // site_settings singleton
  try {
    await api("/collections/site_settings", { token });
    console.log("  · site_settings exists");
  } catch {
    await api("/collections", {
      method: "POST",
      token,
      body: {
        collection: "site_settings",
        meta: { singleton: true, accountability: "all" },
        schema: {},
        fields: [
          {
            field: "id",
            type: "integer",
            meta: { hidden: true, readonly: true, interface: "input" },
            schema: { is_primary_key: true, has_auto_increment: true },
          },
        ],
      },
    });
    console.log("  + site_settings singleton");
  }

  await ensureField(token, "site_settings", {
    field: "about_image",
    type: "uuid",
    meta: { interface: "file-image", special: ["file"] },
    schema: { is_nullable: true },
  });
  await ensureField(token, "site_settings", {
    field: "about_body",
    type: "text",
    meta: { interface: "input-rich-text-html" },
    schema: { is_nullable: true },
  });

  for (const col of ["testimonials", "legal_pages", "sponsors"]) {
    await ensureCollection(token, col, {});
  }

  await ensureField(token, "testimonials", {
    field: "quote",
    type: "text",
    meta: { interface: "input-rich-text-html", required: true },
    schema: { is_nullable: false },
  });
  await ensureField(token, "testimonials", statusField);
  await ensureField(token, "testimonials", {
    field: "sort",
    type: "integer",
    meta: { interface: "input", width: "half" },
    schema: { default_value: 0 },
  });

  await ensureField(token, "legal_pages", {
    field: "title",
    type: "string",
    meta: { interface: "input", required: true },
    schema: { is_nullable: false },
  });
  await ensureField(token, "legal_pages", {
    field: "slug",
    type: "string",
    meta: { interface: "input", required: true },
    schema: { is_nullable: false, is_unique: true },
  });
  await ensureField(token, "legal_pages", {
    field: "content",
    type: "text",
    meta: { interface: "input-rich-text-html" },
    schema: { is_nullable: true },
  });
  await ensureField(token, "legal_pages", statusField);
  await ensureField(token, "legal_pages", {
    field: "sort",
    type: "integer",
    meta: { interface: "input", width: "half" },
    schema: { default_value: 0 },
  });

  await ensureField(token, "sponsors", {
    field: "name",
    type: "string",
    meta: { interface: "input", required: true },
    schema: { is_nullable: false },
  });
  await ensureField(token, "sponsors", {
    field: "photo",
    type: "uuid",
    meta: { interface: "file-image", special: ["file"], required: true },
    schema: { is_nullable: false },
  });
  await ensureField(token, "sponsors", {
    field: "website_url",
    type: "string",
    meta: { interface: "input", options: { placeholder: "https://..." } },
    schema: { is_nullable: true },
  });
  await ensureField(token, "sponsors", {
    field: "hex_size",
    type: "string",
    meta: {
      interface: "select-dropdown",
      options: {
        choices: [
          { text: "Klein", value: "small" },
          { text: "Groot", value: "large" },
        ],
      },
      width: "half",
    },
    schema: { default_value: "small", is_nullable: false },
  });
  await ensureField(token, "sponsors", statusField);
  await ensureField(token, "sponsors", {
    field: "sort",
    type: "integer",
    meta: { interface: "input", width: "half" },
    schema: { default_value: 0 },
  });
}

async function ensurePublicRole(token) {
  const { data: roles } = await api("/roles?fields=id,name", { token });
  let pub = roles.find((r) => r.name === "Public");
  if (!pub) {
    const created = await api("/roles", {
      method: "POST",
      token,
      body: { name: "Public", icon: "public", description: "Anonymous website reads" },
    });
    pub = created.data;
    console.log(`  + Public role: ${pub.id}`);
  } else {
    console.log(`  · Public role: ${pub.id}`);
  }
  return pub.id;
}

async function setPublicPermissions(token, publicPolicyId) {
  const collections = [
    { collection: "site_settings", fields: ["*"] },
    {
      collection: "testimonials",
      fields: ["*"],
      permissions: { status: { _eq: "published" } },
    },
    {
      collection: "legal_pages",
      fields: ["*"],
      permissions: { status: { _eq: "published" } },
    },
    {
      collection: "sponsors",
      fields: ["*"],
      permissions: { status: { _eq: "published" } },
    },
    { collection: "directus_files", fields: ["*"] },
  ];

  for (const item of collections) {
    const perm = {
      policy: publicPolicyId,
      collection: item.collection,
      action: "read",
      fields: item.fields,
      permissions: item.permissions || {},
      validation: {},
      presets: {},
    };
    try {
      await api("/permissions", {
        method: "POST",
        token,
        body: perm,
      });
      console.log(`  + read permission: ${item.collection}`);
    } catch (e) {
      if (String(e).includes("duplicate") || String(e).includes("RECORD_NOT_UNIQUE")) {
        console.log(`  · permission exists: ${item.collection}`);
      } else {
        console.warn(`  ! permission ${item.collection}:`, e.message);
      }
    }
  }
}

async function createStaticToken(token) {
  const name = "breatouch-server";
  const { data: me } = await api(
    `/users/me?fields=id,tokens.id,tokens.name`,
    { token }
  );
  const userId = me.id;
  const old = (me?.tokens || []).find((t) => t.name === name);
  if (old) {
    console.log("  · static token already exists (create new in Directus UI if needed)");
    return null;
  }

  try {
    const created = await api(`/users/${userId}/tokens`, {
      method: "POST",
      token,
      body: { name, expires: null },
    });
    console.log("\n=== SAVE THIS AS DIRECTUS_TOKEN ===");
    console.log(created.data.token);
    console.log("===================================\n");
    return created.data.token;
  } catch (e) {
    console.warn("  ! Could not create user token via API:", e.message);
    console.warn("  Create static token manually in Directus → admin user → Token");
    return null;
  }
}

async function main() {
  console.log("Directus setup:", BASE);
  const token = await login();
  console.log("Logged in.\nSchema:");
  await setupSchema(token);
  console.log("\nPublic policy & permissions:");
  const publicPolicyId = "abf8a154-5b1c-4a46-ac9c-7300570f4f17";
  await ensurePublicRole(token);
  await setPublicPermissions(token, publicPolicyId);
  console.log("\nStatic token:");
  await createStaticToken(token);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
