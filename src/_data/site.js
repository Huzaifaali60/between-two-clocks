// Netlify sets URL automatically during each build. Change "url" here only if you host somewhere else.
module.exports = {
  url: (process.env.URL || "http://localhost:8080").replace(/\/$/, ""),
  name: "Between Two Clocks",
  author: "M. Huzaifa Ali",
  tagline: "A diary written in Lahore, lived on London time, and open to every night owl.",
  description:
    "Between Two Clocks is the personal diary blog of M. Huzaifa Ali, a Lahore novelist, artist and copyeditor. Honest diary entries written in Lahore on London time, plus news on his novel BUT THIS and his next book.",
  lang: "en",
  email: "Huzaifaali60@gmail.com",
  book: {
    title: "BUT THIS",
    url: "https://www.goodreads.com/book/show/258815664-but-this",
    cover: "/img/but-this-cover.jpg",
  },
  socials: [
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/huzaifaali60/" },
    { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/huzaifaali60" },
    { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/huzaifaali60/" },
    { name: "BUT THIS on Goodreads", icon: "goodreads", url: "https://www.goodreads.com/book/show/258815664-but-this" },
  ],
  moods: ["inspired","happy","calm","grateful","hopeful","proud","in love","curious","nostalgic","dreamy","restless","anxious","tired","lonely","sad","heartbroken","angry","numb"],
};
