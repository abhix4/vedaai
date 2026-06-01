"use client"

import { useEffect, useState } from "react"

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf"

import { pdf } from "@react-pdf/renderer"

import QuestionPaperTemplate from "./question-paper-template"
import { useIsMobile } from "@/hooks/useIsMobile"
import { apiFetch } from "@/lib/api"
import { usePathname } from "next/navigation"

if (
  typeof window !== "undefined" &&
  !pdfjs.GlobalWorkerOptions.workerSrc
) {
  pdfjs.GlobalWorkerOptions.workerSrc =
    new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString()
}

export default function PdfPreview() {
  const [url, setUrl] = useState<
    string | null
  >(null)
  
  const isMobile = useIsMobile()
  const [numPages, setNumPages] =
    useState(0)
  
  const [assignment, setAssignment] = useState<any>()
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

  const pathName = usePathname()
  const clearPathName = pathName.split("/")
  // console.log(clearPathName[2])




  
 

  useEffect(() => {
  let objectUrl: string | undefined

  const init = async () => {
    const res = await apiFetch(
      "/get-question-paper",
      {
        method: "POST",
        body: JSON.stringify({
          qpId: clearPathName[2],
        }),
      }
    )

    const assignment = res.response

    const blob = await pdf(
      <QuestionPaperTemplate assignment={assignment} />
    ).toBlob()

    objectUrl = URL.createObjectURL(blob)
    setPdfBlob(blob)
    setAssignment(assignment)
    setUrl(objectUrl)
  }

  init()

  return () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
    }
  }
}, [])

  if (!url) return null
  
  return (
    <div className="flex justify-center p-2">
      <Document
        file={url}
        loading={null}
        onLoadSuccess={({
          numPages,
        }) => setNumPages(numPages)}
      >
        {Array.from(
          { length: numPages },
          (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={isMobile ? 300 : 1000}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )
        )}
      </Document>
    </div>
  )
}