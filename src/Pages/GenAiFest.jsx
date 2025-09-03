import React, { useState } from "react";
import {
  questionsSection,
  corporateaccountAgendaSection,
  businessaccountAgendaSection,
  dotnetbatchSessionsSection,
  javabatchSessionsSection,
  reactbatchSessionsSection,
  cloudbatchSessionsSection,
} from "../data";

import Table from "../components/Table";
import Button from "../components/Button";
import Typography from "../components/Typography";

import LiteracySection from "./LiteracySection";
import LeadersSection from "./LeadersSection";
import CoachSection from "./CoachSection";
import WhyItMattersSection from "./WhyItMattersSection";
import ExpectationsSection from "./ExpectationsSection";

const GenAiFest = () => {
  // State
  const [activeAgenda, setActiveAgenda] = useState("business"); // 'business' | 'corporate'
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'agenda' | 'batches' | 'terminology'
  const [activeBatch, setActiveBatch] = useState("java"); // 'java' | 'dotnet' | 'cloud' | 'react'

  // Derived data
  const activeSection =
    activeAgenda === "business"
      ? businessaccountAgendaSection
      : corporateaccountAgendaSection;

  // Choose grouped batch array based on activeBatch
  const batchSections =
    activeBatch === "java"
      ? javabatchSessionsSection
      : activeBatch === "dotnet"
      ? dotnetbatchSessionsSection
      : activeBatch === "cloud"
      ? cloudbatchSessionsSection
      : reactbatchSessionsSection;

  // Tabs
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "agenda", label: "Event Agenda" },
    { id: "batches", label: "Batch Details" },
    { id: "terminology", label: "Gen AI Literacy" },
  ];

  // Table columns
  const columnsBatches = [
    { key: "date", title: "Date" },
    { key: "time", title: "Time" },
    { key: "day", title: "Day" },
    { key: "sessionName", title: "Session Name" },
    { key: "ecCoach", title: "EC Coach" },
    { key: "mode", title: "Mode" },
    { key: "location", title: "Location" },
  ];

  const columnsAgenda = [
    { key: "date", title: "Date" },
    { key: "time", title: "Time" },
    { key: "day", title: "Day" },
    { key: "sessionName", title: "Session Name" },
    { key: "presenters", title: "Presenters" },
    { key: "mode", title: "Mode" },
    { key: "location", title: "Location" },
  ];

  // Helpers
  const formatAgendaData = (sessions) =>
    sessions.map((s) => ({
      ...s,
      presenters: Array.isArray(s.presenters)
        ? s.presenters.join(", ")
        : s.presenters || "",
    }));

  return (
    <div className="min-h-screen   flex flex-col">
      {/* Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-center  gap-3">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "primary" : "secondary"}
              size="md"
              className="flex items-center gap-2 rounded-full"
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <>
          <LeadersSection />
          <CoachSection />
          <WhyItMattersSection />
          <ExpectationsSection />
        </>
      )}

      {activeTab === "agenda" && (
        <div className="p-6 bg-gray-800  text-gray-300">
          <div className="flex gap-6">
            {/* Sidebar: Agenda Switch */}
            <div className="rounded-xl mt-23 space-y-3">
              <Button
                onClick={() => setActiveAgenda("business")}
                variant={activeAgenda === "business" ? "primary" : "secondary"}
                size="sm"
                className="w-full text-center flex-col"
              >
                Enterprise <br /> Business
              </Button>
              <Button
                onClick={() => setActiveAgenda("corporate")}
                variant={activeAgenda === "corporate" ? "primary" : "secondary"}
                size="sm"
                className="w-full text-center flex-col"
              >
                Corporate <br /> Account
              </Button>
            </div>

            {/* Right Content */}
            <div className="flex-1">
              <h1 className="text-xl mx-4 ">{activeSection.heading}</h1>
              <h2 className="text-l text-gray-300 mx-4 mb-4">
                {activeSection.subHeading}
              </h2>
              <div className=" p-4">
                <Table
                  columns={columnsAgenda}
                  data={formatAgendaData(activeSection.sessions)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "terminology" && <LiteracySection />}

      {activeTab === "batches" && (
        <div className="p-6 bg-gray-800 text-gray-300">
          <div className="flex gap-6 items-start">
            {/* Sidebar: Batch Track Selector */}
            <div className="flex flex-col gap-4 mt-15">
              <Button
                onClick={() => setActiveBatch("java")}
                variant={activeBatch === "java" ? "primary" : "secondary"}
                size="sm"
                className="text-center flex-col rounded-xl shadow-md px-15"
              >
                Java <br /> Batch
              </Button>
              <Button
                onClick={() => setActiveBatch("dotnet")}
                variant={activeBatch === "dotnet" ? "primary" : "secondary"}
                size="sm"
                className="text-center flex-col rounded-xl shadow-md"
              >
                .NET <br /> Batch
              </Button>
              <Button
                onClick={() => setActiveBatch("cloud")}
                variant={activeBatch === "cloud" ? "primary" : "secondary"}
                size="sm"
                className="text-center flex-col rounded-xl shadow-md"
              >
                Cloud <br /> Batch
              </Button>
              <Button
                onClick={() => setActiveBatch("react")}
                variant={activeBatch === "react" ? "primary" : "secondary"}
                size="sm"
                className="text-center flex-col rounded-xl shadow-md"
              >
                React <br /> Batch
              </Button>
            </div>

            {/* Right Content: Batches for Selected Track */}
  {/* Right Content: Batches for Selected Track */}
<div className="flex-1">
  {Array.isArray(batchSections) ? (
    batchSections
      .slice()
      .sort((a, b) => (b.batchNumber ?? 0) - (a.batchNumber ?? 0)) // ✅ Latest batch first
      .map((batch, idx) => (
        <div
          key={batch.batchNumber || batch.heading || idx}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold mb-2 mx-4">{batch.heading}</h1>
          {batch.subHeading && (
            <h2 className="text-lg text-gray-400 mb-4">
              {batch.subHeading}
            </h2>
          )}
          <div className="p-4">
            <Table columns={columnsBatches} data={batch.sessions} />
          </div>
        </div>
      ))
  ) : (
    // Fallback if someone passes a single object instead of an array
    <>
      <h1 className="text-2xl font-bold mb-6">{batchSections?.heading}</h1>
      <div className="bg-gray-800 rounded-xl shadow-md p-4">
        <Table
          columns={columnsBatches}
          data={batchSections?.sessions || []}
        />
      </div>
    </>
  )}
</div>

          </div>
        </div>
      )}

      {/* Footer */}
<footer>
  <div className="max-w-6xl mx-auto px-6 py-12">
    <div className="text-center mb-12">
      <Typography variant="heading">{questionsSection.heading}</Typography>

      <div className="grid md:grid-cols-3 gap-8 mt-7 mb-12">
        {questionsSection.contacts.map((contact, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-300"
          >
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <img
                src={contact.image}
                alt={contact.name}
                className="w-16 h-16 rounded-full object-cover mb-4 shadow-lg border-2 "
              />

              {/* Name */}
              <Typography
                variant="subheading"
                className="mb-2 "
              >
                {contact.name}
              </Typography>

              {/* Role */}
              <Typography variant="body" className="text-sm leading-relaxed">
                {contact.role}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <Typography variant="heading">{questionsSection.closingNote}</Typography>
    </div>
  </div>
</footer>

    </div>
  );
};

export default GenAiFest;
