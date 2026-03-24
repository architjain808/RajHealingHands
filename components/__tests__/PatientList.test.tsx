import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PatientList from "../admin/PatientList";
import { patientService } from "../../services/patientService";

// Mock the framer-motion module to prevent animation-related test issues
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: require('react').forwardRef((props: any, ref: any) => <div ref={ref} {...props} />),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock the patientService
vi.mock('../../services/patientService', () => ({
  patientService: {
    getAll: vi.fn(),
    remove: vi.fn(),
  }
}));

describe("PatientList - Empty State", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display 'No patients found' when there are no patients", async () => {
    (patientService.getAll as any).mockResolvedValue([]);

    render(<PatientList refreshKey={0} onEdit={vi.fn()} />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText("No patients found")).toBeInTheDocument();
    });

    expect(screen.getByText("Add your first patient record")).toBeInTheDocument();
  });

  it("should display 'Try adjusting your filters' when there are no patients matching filters", async () => {
    (patientService.getAll as any).mockResolvedValue([{
      id: "1",
      name: "John Doe",
      date: "2023-01-01",
      contact: "1234567890",
      address: "123 Main St",
      condition: "Test Condition",
      dayOfOPD: 1,
      amountPaid: 100,
    }]);

    render(<PatientList refreshKey={0} onEdit={vi.fn()} />);

    // Wait for the initial data to be loaded
    await waitFor(() => {
      // It might render multiple "John Doe" strings (e.g. mobile vs desktop table view)
      expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);
    });

    // Apply a filter that matches nothing
    const searchInput = screen.getByPlaceholderText("Search by name...");
    await userEvent.type(searchInput, "Jane Doe");

    await waitFor(() => {
      expect(screen.getByText("No patients found")).toBeInTheDocument();
      expect(screen.getByText("Try adjusting your filters")).toBeInTheDocument();
    });
  });
});
