"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { ClinicalNote } from "@/types/ClinicalNote";

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString();
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  previewLabel: {
    fontSize: 14,
    color: "#FF6347",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  sectionContent: {
    fontSize: 12,
    color: "#333",
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 12,
    color: "#888",
  },
  downloadLink: {
    textAlign: "center",
    marginTop: 20,
  },
});

export const ClinicalNotePdfDocument = ({
  clinicalNote,
}: {
  clinicalNote: ClinicalNote;
}) => (
  <PDFViewer height={500} width={300}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Electronic Health Record (EHR)</Text>
          <Text style={styles.subtitle}>Patient Clinical Summary</Text>
          <Text style={styles.subtitle}>Date: {getCurrentDateTime()}</Text>
        </View>

        {/* Preview Label */}
        <Text style={styles.previewLabel}>Preview - Not a final document</Text>

        {/* Chief Complaint Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chief Complaint</Text>
          <Text style={styles.sectionContent}>
            {clinicalNote.chief_complaint}
          </Text>
        </View>

        {/* History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>History</Text>
          <Text style={styles.sectionContent}>{clinicalNote.history}</Text>
        </View>

        {/* Examination Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examination</Text>
          <Text style={styles.sectionContent}>{clinicalNote.examination}</Text>
        </View>

        {/* Diagnosis Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <Text style={styles.sectionContent}>{clinicalNote.diagnosis}</Text>
        </View>

        {/* Treatment Plan Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Treatment Plan</Text>
          <Text style={styles.sectionContent}>
            {clinicalNote.treatment_plan}
          </Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text>© 2025 HealthCare Inc. - All Rights Reserved</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);
