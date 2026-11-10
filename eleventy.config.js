module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Published entries only, newest first. Drafts never get a page.
  eleventyConfig.addCollection("entries", (api) =>
    api
      .getFilteredByGlob("src/entries/*.md")
      .filter((e) => !e.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  const fmt = (d, opts) =>
    new Date(d).toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });

  eleventyConfig.addFilter("readableDate", (d) =>
    fmt(d, { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("rfcDate", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("stripHtml", (s = "") =>
    String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  );
  eleventyConfig.addFilter("wordCount", (s = "") =>
    String(s).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length
  );
  eleventyConfig.addFilter("excerpt", (s = "", n = 150) => {
    const t = String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return t.length > n ? t.slice(0, n).replace(/\s\S*$/, "") + "..." : t;
  });
  eleventyConfig.addFilter("readTime", (s = "") =>
    Math.max(1, Math.round(String(s).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200))
  );
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v).replace(/</g, "\\u003c"));
  eleventyConfig.addFilter("absUrl", (path, base) => new URL(path, base).href);

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};
