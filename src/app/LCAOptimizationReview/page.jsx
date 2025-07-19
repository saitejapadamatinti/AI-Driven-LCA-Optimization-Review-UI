"use client";

import React, { useState, useEffect } from "react";
import { IconSpinner } from "../../../public/icons/spinner";
import Notification from "@/components/notification";

export default function LCAOptimizationReview() {
  const [lcaData, setLcaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ status: "", text: "" });

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/mock/lca-optimization.json");
        const data = await response.json();
        console.log("data", data);
        if (data.status === "success") {
          setLcaData(data.data);
        } else {
          setMessage({ status: "error", text: "Failed to load LCA data." });
        }
      } catch (err) {
        setMessage({ status: "error", text: "Failed to load LCA data." });
      } finally {
        setLoading(false);
      }
    };
    fetchLocalData();
  }, []);

  const calculateReduction = () => {
    if (!lcaData) return 0;
    return Math.round(
      ((lcaData.originalLCA - lcaData.optimizedLCA) / lcaData.originalLCA) * 100
    );
  };

  const handleDecision = async (decision) => {
    setSubmitting(true);
    setMessage({ status: "", text: "" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = {
        status: decision === "approve" ? "success" : "error",
        message:
          decision === "approve"
            ? "Optimization approved successfully!"
            : "Optimization rejected.",
      };
      setMessage({ status: response.status, text: response.message });
      setTimeout(() => setMessage({ status: "", text: "" }), 3000);
    } catch (err) {
      setMessage({
        status: "error",
        text: "Failed to process decision. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
        <div className="text-center">
          <IconSpinner className="h-8 w-8 mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading optimization data...</p>
        </div>
      </div>
    );
  }

  const reductionPercentage = calculateReduction();
  const formattedReduction = `${reductionPercentage > 0 ? "-" : ""}${Math.abs(
    reductionPercentage
  )}%`;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl lg:max-w-4xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl mb-2">
            LCA Optimization Review
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            AI-Powered Carbon Footprint Analysis
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
            <div className="text-center">
              <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                Original Crate LCA
              </h2>
              <div
                className="font-bold text-red-600 mb-1"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                {lcaData?.originalLCA ?? "—"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                {lcaData?.unit ?? ""}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1 sm:mb-2">
                AI-Suggested Optimized Crate LCA
              </h2>
              <div
                className="font-bold text-green-600 mb-1"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
              >
                {lcaData?.optimizedLCA ?? "—"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                {lcaData?.unit ?? ""}
              </div>
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8 p-3 sm:p-4 bg-green-50 rounded-lg">
            <div
              className="font-bold text-green-700 mb-1"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
            >
              {formattedReduction}
            </div>
            <div className="text-xs sm:text-sm text-green-600">
              Carbon Reduction
            </div>
          </div>

          <div className="mb-6 sm:mb-8 text-left sm:text-justify">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
              Optimization Reason
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {lcaData?.optimizationReason ??
                "No optimization details available."}
            </p>
          </div>

          {message.status && (
            <Notification
              status={message.status}
              notificationMessage={message.text}
            />
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:justify-center">
            {submitting ? (
              <IconSpinner className="h-8 w-8" />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleDecision("reject")}
                  disabled={submitting}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base cursor-pointer"
                >
                  Reject Suggestion
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision("approve")}
                  disabled={submitting}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base cursor-pointer"
                >
                  Approve Suggestion
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
