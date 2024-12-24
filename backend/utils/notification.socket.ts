import { Server, Socket } from "socket.io";
import { z } from "zod";
import { createNotificationSchema } from "../schemas/notification.schema"; // Zod schema
import * as notificationService from "../models/notification.model"; // Notification service


type UserSocketIds = { [userId: string]: string[] };

export const initializeSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  const userSocketIds: UserSocketIds = {};

  io.on("connection", (socket: Socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("register", (userId: string) => {
      if (!userSocketIds[userId]) {
        userSocketIds[userId] = [];
      }
      userSocketIds[userId].push(socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("sendNotification", async (data) => {
      try {
        const parsedData = createNotificationSchema.parse(data);
        const { userId, type, content, isGlobal } = parsedData;

        const notification = await notificationService.createNotification(userId, type, content);

        if (userSocketIds[userId]) {
          userSocketIds[userId].forEach((socketId) => {
            io.to(socketId).emit("notification", notification);
          });
        }

        if (isGlobal) {
          io.emit("globalNotification", notification);
        }

        console.log(`Notification sent to user ${userId}: ${type} - ${content}`);
      } catch (error) {
        if (error instanceof z.ZodError) {
          socket.emit("error", { message: "Invalid data format", details: error.errors });
        } else {
          console.error("Error in sendNotification:", error);
        }
      }
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
      for (const userId in userSocketIds) {
        userSocketIds[userId] = userSocketIds[userId].filter(id => id !== socket.id);
      }
    });
  });
};
