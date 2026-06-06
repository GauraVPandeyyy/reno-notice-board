import prisma from "@/lib/prisma";

const validCategories = ["Exam", "Event", "General"];
const validPriorities = ["Normal", "Urgent"];

export default async function handler(req, res) {
  const { id } = req.query;
  const noticeId = Number(id);

  if (isNaN(noticeId)) {
    return res.status(400).json({
      error: "Invalid notice ID",
    });
  }

  if (req.method === "PUT" || req.method === "PATCH") {
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
      const updatedNotice = await prisma.notice.update({
        where: {
          id: noticeId,
        },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(200).json(updatedNotice);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "Notice not found",
        });
      }

      console.error(error);

      return res.status(500).json({
        error: "Failed to update notice",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({
        where: {
          id: noticeId,
        },
      });

      return res.status(200).json({
        message: "Notice deleted successfully",
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "Notice not found",
        });
      }

      console.error(error);

      return res.status(500).json({
        error: "Failed to delete notice",
      });
    }
  }

  res.setHeader("Allow", ["PUT", "PATCH", "DELETE"]);

  return res.status(405).json({
    error: `Method ${req.method} Not Allowed`,
  });
}