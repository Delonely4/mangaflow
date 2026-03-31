export const validateBookData = ({
  name,
  cover_img,
  status,
  total_chapters,
}) => {
  if (!name || !cover_img || !status) {
    return {
      isValid: false,
      message: "Name, cover image and status are required",
    };
  }

  if (name.length < 2) {
    return {
      isValid: false,
      message: "Book name must be at least 2 characters long",
    };
  }

  const validStatuses = ["ongoing", "completed", "hiatus", "cancelled"];
  if (!validStatuses.includes(status.toLowerCase())) {
    return {
      isValid: false,
      message: "Status must be one of: ongoing, completed, hiatus, cancelled",
    };
  }

  if (
    total_chapters &&
    (!Number.isInteger(total_chapters) || total_chapters < 0)
  ) {
    return { isValid: false, message: "Total chapters must be greater than 0" };
  }

  return { isValid: true };
};
