import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profilePhoto } = req.body;
    if (!name || !email || !password) {
      throw new Error("All field required!");
    }
    const result = await userService.createUserIntoDB({
      name,
      email,
      password,
      profilePhoto,
    });
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: { result },
    });
  } catch (error) {
    console.log("from create User controller error : ", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: (error as Error).message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
};
