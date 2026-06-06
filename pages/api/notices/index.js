import prisma from "@/lib/prisma";

const validCategories = ["Exam", "Event", "General"];
const validPriorities = ["Normal", "Urgent"];

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
        ],
      });

      return res.status(200).json(notices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Failed to fetch notices",
      });
    }
  }

  if (req.method === "POST") {
    const {
      title,
      body,
      category,
      priority,
      publishDate,
      image,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (!body?.trim()) {
      return res.status(400).json({
        error: "Body is required",
      });
    }

    if (!publishDate || isNaN(new Date(publishDate).getTime())) {
      return res.status(400).json({
        error: "Valid publish date is required",
      });
    }

    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        error: "Invalid category",
      });
    }

    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        error: "Invalid priority",
      });
    }

    try {
      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category || "General",
          priority: priority || "Normal",
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Failed to create notice",
      });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).json({
    error: `Method ${req.method} Not Allowed`,
  });
}