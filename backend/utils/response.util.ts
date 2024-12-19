export const successResponse = (res: any, data: any, message: string) => {
  return res.status(200).json({ success: true, data, message });
};

export const errorResponse = (res: any, message: string) => {
  return res.status(400).json({ success: false, message });
};
