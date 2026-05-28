// app/login/page.tsx

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { toast } from "sonner"
import { apiFetch } from "@/lib/api"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be atleast 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (
  data: LoginFormValues
) => {
  try {
    const response = await apiFetch(
      "/teacher/login",
      {
        method: "POST",

        body: JSON.stringify(data),
      }
    )

    localStorage.setItem(
      "token",
      response.accessToken
    )

    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    )

    toast.success("Logged in")

    router.push("/home")
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Login failed"
    )
  }
}

  return (
    <div className="flex flex-col  gap-8 min-h-screen items-center justify-center bg-linear-to-b from-white to-[#E4F2FC] p-6">
        <div className="flex items-end gap-2">
            <Image src='/logo.avif' width={40} height={40} alt="logo"/>
            <p className="tracking-tighter text-lg font-semibold">VedaAI</p>  
        </div>  
    
      <Card className="w-full max-w-md rounded-[24px] border shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl">
            Login to continue to your account
          </CardTitle>

         
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="">
              {/* Email */}
              <Field
                data-invalid={
                  !!form.formState.errors.email
                }
              >
                <FieldLabel>Email</FieldLabel>

                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...form.register("email")}
                  className="h-12 rounded-full"
                />

                {form.formState.errors.email && (
                  <FieldError
                    errors={[
                      form.formState.errors.email,
                    ]}
                  />
                )}
              </Field>

              {/* Password */}
              <Field
                data-invalid={
                  !!form.formState.errors.password
                }
              >
                <FieldLabel>Password</FieldLabel>

                <Input
                  type="password"
                  placeholder="Password"
                  {...form.register("password")}
                  className="h-12 rounded-full"
                />

                {form.formState.errors.password && (
                  <FieldError
                    errors={[
                      form.formState.errors.password,
                    ]}
                  />
                )}
              </Field>

              <Button
                type="submit"
                className="h-12 w-full rounded-full"
              >
                Login
              </Button>
            </FieldGroup>
            <p className="mt-2">New User? <span className="underline text-black/60 cursor-pointer" onClick={() => router.push("/signup")}>Signup</span> instead.</p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}