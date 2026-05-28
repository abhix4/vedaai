import type { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../db/userSchema"

const BCRYPT_ROUNDS = 12

// login
export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      email,
    })

    if (!user) {
      res.status(401).json({
        error: "Invalid credentials",
      })

      return
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    )

    if (!valid) {
      res.status(401).json({
        error: "Invalid credentials",
      })

      return
    }

    const secret = process.env.JWT_SECRET

    if (!secret) {
      res.status(500).json({
        error: "Auth misconfiguration",
      })

      return
    }

    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
      },

      secret,

      {
        expiresIn: "7d",
      }
    )

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      maxAge:
        1000 * 60 * 60 * 24 * 7,

      path: "/",
    })

    res.status(200).json({
      user,
    })
  } catch (error) {
    console.error("Login error:", error)

    res.status(500).json({
      error: "Internal server error",
    })
  }
}

// signup
export const signup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      institute,
    } = req.body

    const existing =
      await User.findOne({
        email,
      })

    if (existing) {
      res.status(409).json({
        error: "Email already in use",
      })

      return
    }

    const passwordHash =
      await bcrypt.hash(
        password,
        BCRYPT_ROUNDS
      )

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      institute,
    })

    res.status(201).json({
      user,
    })
  } catch (error) {
    console.error("Signup error:", error)

    res.status(500).json({
      error: "Internal server error",
    })
  }
}

// logout
export const logout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure:
        process.env.NODE_ENV ===
        "production",
      path: "/",
    })

    res.status(200).json({
      message: "Logged out",
    })
  } catch (error) {
    console.error("Logout error:", error)

    res.status(500).json({
      error: "Internal server error",
    })
  }
}