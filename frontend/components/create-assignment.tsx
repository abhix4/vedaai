"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import {
  Calendar,
  ChevronDown,
  Mic,
  Minus,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const questionTypes = [
  "Multiple Choice Questions",
  "Short Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
]

const formSchema = z.object({
  dueDate: z.string(),

  additionalInfo: z.string().optional(),

  questions: z.array(
    z.object({
      type: z.string(),
      count: z.number(),
      marks: z.number(),
    })
  ),
})

export default function CreateAssignmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      dueDate: "",
      additionalInfo: "",

      questions: [
        {
          type: "Multiple Choice Questions",
          count: 4,
          marks: 1,
        },

        {
          type: "Short Questions",
          count: 3,
          marks: 2,
        },

        {
          type: "Diagram/Graph-Based Questions",
          count: 5,
          marks: 5,
        },

        {
          type: "Numerical Problems",
          count: 5,
          marks: 5,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Assignment Created", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-black p-4 text-white">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const totalQuestions = form
    .watch("questions")
    .reduce((acc, item) => acc + item.count, 0)

  const totalMarks = form
    .watch("questions")
    .reduce(
      (acc, item) => acc + item.count * item.marks,
      0
    )

  return (
    <Card className="w-full rounded-[32px] border-0 bg-[#FFFFFF80] shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">
          Assignment Details
        </CardTitle>

        <CardDescription>
          Basic information about your assignment
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="assignment-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Upload */}
          <div className="overflow-hidden rounded-2xl border-2 border-dashed border-[#00000033] bg-white">
            <div className="flex flex-col items-center justify-center py-16">
              <Upload className="mb-4 h-6 w-6 text-neutral-500" />

              <p className="text-sm font-medium">
                Choose a file or drag & drop it here
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                JPEG, PNG, upto 10MB
              </p>

              <Button
                type="button"
                variant="secondary"
                className="mt-5 px-6 py-2 rounded-full"
              >
                Browse Files
              </Button>
            </div>

            
          </div>
            <div className="px-4 text-sm text-center font-medium text-[#30303099] ">
             Upload images of your preferred document/image
            </div>
          {/* Due Date */}
          <Controller
            name="dueDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Due Date
                </FieldLabel>

                <div className="relative">
  <Input
    {...field}
    type="date"
    placeholder="DD-MM-YYYY"
    className="
      h-12 rounded-full pr-12
      [&::-webkit-calendar-picker-indicator]:absolute
      [&::-webkit-calendar-picker-indicator]:inset-0
      [&::-webkit-calendar-picker-indicator]:h-full
      [&::-webkit-calendar-picker-indicator]:w-full
      [&::-webkit-calendar-picker-indicator]:cursor-pointer
      [&::-webkit-calendar-picker-indicator]:opacity-0
    "
  />

  <Calendar className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
</div>

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          {/* Question Header */}
          <div className="grid grid-cols-[1fr_50px_120px_120px] gap-4 px-2 text-sm font-medium text-neutral-700">
            <p>Question Type</p>

            <p />

            <p className="text-center">
              No. of Questions
            </p>

            <p className="text-center">Marks</p>
          </div>

          {/* Questions */}
          <FieldGroup className="space-y-4">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_50px_120px_120px] items-center gap-4"
              >
                {/* Type */}
                <Controller
                  name={`questions.${index}.type`}
                  control={form.control}
                  render={({ field }) => (
                  <div className="relative">
  <select
    {...field}
    value={field.value}
    className="
      h-12 w-full appearance-none rounded-full
      border-0 bg-white px-4 pr-10 text-sm
      outline-none
    "
  >
    {questionTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>

  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
</div>
                  )}
                />

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center justify-center"
                >
                 <X size={16}/>
                </button>

                {/* Count */}
                <Controller
                  name={`questions.${index}.count`}
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex h-12 items-center justify-between rounded-full bg-white px-4">
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(
                            Math.max(
                              1,
                              field.value - 1
                            )
                          )
                        }
                      >
                        <Minus size={16} />
                      </button>

                      <span>{field.value}</span>

                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(
                            field.value + 1
                          )
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                />

                {/* Marks */}
                <Controller
                  name={`questions.${index}.marks`}
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex h-12 items-center justify-between rounded-full bg-white px-4">
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(
                            Math.max(
                              1,
                              field.value - 1
                            )
                          )
                        }
                      >
                        <Minus  size={16}/>
                      </button>

                      <span>{field.value}</span>

                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(
                            field.value + 1
                          )
                        }
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                />
              </div>
            ))}

            {/* Add */}
            <button
              type="button"
              onClick={() =>
                append({
                  type:
                    "Multiple Choice Questions",
                  count: 1,
                  marks: 1,
                })
              }
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <Plus className="h-4 w-4" />
              </div>

              <span className="text-sm font-medium">
                Add Question Type
              </span>
            </button>
          </FieldGroup>

          {/* Totals */}
          <div className="space-y-1 text-right text-sm">
            <p>
              Total Questions:{" "}
              <span className="font-semibold">
                {totalQuestions}
              </span>
            </p>

            <p>
              Total Marks:{" "}
              <span className="font-semibold">
                {totalMarks}
              </span>
            </p>
          </div>

          {/* Additional Info */}
          <Controller
            name="additionalInfo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Additional Information (For better
                  output)
                </FieldLabel>

                <InputGroup className="border border-dashed rounded-3xl ">
                  <InputGroupTextarea
                    {...field}
                    placeholder="e.g Generate a question paper for 3 hour exam duration..."
                    rows={5}
                    className="px-4 py-6 resize-none rounded-3xl  bg-white pr-12"
                  />
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-full"
          >
            Generate Assignment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}