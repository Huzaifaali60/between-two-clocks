module.exports = {
  layout: "entry.njk",
  tags: [],
  eleventyComputed: {
    // Drafts get no page at all
    permalink: (data) => (data.draft ? false : `/entries/${data.page.fileSlug}/`),
    description: (data) => {
      const t = String(data.description || data.page?.rawInput || "")
        .replace(/[#*_>`\[\]]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      return t.length > 155 ? t.slice(0, 155).replace(/\s\S*$/, "") + "..." : t;
    },
  },
};
