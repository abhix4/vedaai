import React from "react"
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

Font.registerHyphenationCallback(
  (word) => [word]
)

const questionPaper = {
  school:
    "Delhi Public School, Sector-4, Bokaro",

  subject: "English",

  class: "5th",

  duration: "45 minutes",

  totalMarks: 20,

  sections: [
    {
      section: "Section A",

      title: "Short Answer Questions",

      instructions:
        "Attempt all questions. Each question carries 2 marks",

      questions: [
        {
          difficulty: "Easy",
          question:
            "Define electroplating. Explain its purpose.",

          marks: 2,
        },

        {
          difficulty: "Moderate",
          question:
            "What is the role of a conductor in the process of electrolysis?",

          marks: 2,
        },

        {
          difficulty: "Easy",
          question:
            "Why does a solution of copper sulphate conduct electricity?",

          marks: 2,
        },

        {
          difficulty: "Moderate",
          question:
            "Describe one example of the chemical effect of electric current in daily life.",

          marks: 2,
        },

        {
          difficulty: "Moderate",
          question:
            "Explain why electric current is said to have chemical effects.",

          marks: 2,
        },
      ],

      answers: [
        "Electroplating is the process of depositing a thin layer of metal on another metal using electric current.",

        "A conductor allows the flow of electric current causing ions to move in the electrolyte.",

        "Copper sulphate solution contains free ions which conduct electricity.",

        "Electroplating of jewellery prevents corrosion and improves appearance.",

        "Electric current causes chemical reactions in electrolyte solutions.",
      ],
    },
  ],
}

export default function QuestionPaperTemplate({ assignment }: any) {

  console.log('props: ', assignment)
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 11,
      fontFamily: "Helvetica",
      backgroundColor: "#ffffff",
      lineHeight: 1.5,
    },

    container: {

      padding: 20,
      minHeight: "100%",
    },

    schoolName: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 6,
    },

    centeredText: {
      textAlign: "center",
      fontSize: 14,
      marginBottom: 3,
      fontWeight: "bold",
    },

    topRow: {
      marginTop: 18,
      marginBottom: 18,
      flexDirection: "row",
      justifyContent: "space-between",
    },

    instructionText: {
      marginBottom: 24,
      fontWeight: "bold",
    },

    studentInfo: {
      marginBottom: 30,
      gap: 6,
    },

    studentLine: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },

    underline: {
      borderBottom: "1px solid #000",
      width: 100,
      marginLeft: 4,
    },

    sectionHeading: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 24,
      marginTop: 24,
      fontWeight: "bold",
    },

    questionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 2,
    },

    questionInstruction: {
      fontSize: 10,
      marginBottom: 18,
      fontStyle: "italic",
      color: "#555",
    },

    questionItem: {
      flexDirection: "row",
      marginBottom: 10,
    },

    questionNumber: {
      width: 20,
    },

    questionText: {
      flex: 1,
      paddingRight: 10,
    },

    footerText: {
      marginTop: 12,
      fontWeight: "bold",
    },

    answerKeyHeading: {
      marginTop: 40,
      marginBottom: 14,
      fontSize: 16,
      fontWeight: "bold",
    },

    answerItem: {
      marginBottom: 10,
      flexDirection: "row",
    },

    answerNumber: {
      width: 20,
    },

    answerText: {
      flex: 1,
    },
  })

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.container}>
          {/* Header */}
          <Text style={styles.schoolName}>
            {assignment?.title || questionPaper.school}
          </Text>

          <Text style={styles.centeredText}>
            Subject: {assignment?.subject}
          </Text>

          <Text style={styles.centeredText}>
            Class: {assignment?.class}
          </Text>

          {/* Top Info */}
          <View style={styles.topRow}>
            <Text>
              Time Allowed:{" "}
              {assignment.duration}
            </Text>

            <Text>
              Maximum Marks:{" "}
              {assignment.totalMarks}
            </Text>
          </View>

          {/* Instructions */}
          <Text style={styles.instructionText}>
            All questions are compulsory
            unless stated otherwise.
          </Text>

          {/* Student Details */}
          <View style={styles.studentInfo}>
            <View style={styles.studentLine}>
              <Text>Name:</Text>

              <View style={styles.underline} />
            </View>

            <View style={styles.studentLine}>
              <Text>Roll Number:</Text>

              <View style={styles.underline} />
            </View>

            <View style={styles.studentLine}>
              <Text>
                Class: 5th Section:
              </Text>

              <View style={styles.underline} />
            </View>
          </View>

          {/* Sections */}
          {assignment?.sections.map(
            (section: any, sectionIndex: number) => (
              <View key={sectionIndex}>
                <Text
                  style={styles.sectionHeading}
                >
                  Section: {section.section}
                </Text>

                <Text
                  style={styles.questionTitle}
                >
                  {section?.type}
                </Text>

                <Text
                  style={
                    styles.questionInstruction
                  }
                >
                  {section?.instructions}
                </Text>

                {section?.questions.map(
                  (question: any, index: number) => (
                    <View
                      key={index}
                      style={
                        styles.questionItem
                      }
                    >
                      <Text
                        style={
                          styles.questionNumber
                        }
                      >
                        {index + 1}.
                      </Text>

                      <Text
                        style={
                          styles.questionText
                        }
                      >
                        [
                        {
                          question.difficulty
                        }
                        ]{" "}
                        {question.question} [
                        {question.marks} Marks]
                      </Text>
                    </View>
                  )
                )}

                {/* <Text style={styles.footerText}>
                  End of Question Paper
                </Text> */}

                {/* Answer Key */}
                {/* <Text
                  style={
                    styles.answerKeyHeading
                  }
                >
                  Answer Key:
                </Text> */}

                {/* {section.answers.map(
                  (answer: any, index: number) => (
                    <View
                      key={index}
                      style={
                        styles.answerItem
                      }
                    >
                      <Text
                        style={
                          styles.answerNumber
                        }
                      >
                        {index + 1}.
                      </Text>

                      <Text
                        style={
                          styles.answerText
                        }
                      >
                        {answer}
                      </Text>
                    </View>
                  )
                )} */}
              </View>
            )
          )}
        </View>
      </Page>
    </Document>
  )
}