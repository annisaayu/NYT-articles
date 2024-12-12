import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from "../pages/Home";
import { fetchArticles } from "../services/api";

jest.mock("../services/api");
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

const mockFetchArticles = () => {
  fetchArticles.mockImplementation(
    () => new Promise((resolve) => {
      setTimeout(() => resolve([]), 1000);
    })
  );
}

describe("Home Page", () => {

  test("render Home component and fetch Articles on load", async () => {
    const mockArticles = [
      { _id: "1", headline: { main: "Article 1" }, byline: { original: "Author 1" }, pub_date: "2024-01-01", lead_paragraph: "Article lead paragraph" },
    ];
    fetchArticles.mockResolvedValue(mockArticles);
    render(<Home/>);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
    });

    expect(screen.getAllByRole("article")).toHaveLength(mockArticles.length);
  });

  test("display error message when API call fails", async () => {
    fetchArticles.mockRejectedValue(new Error("Failed to fetch the articles. Please try again"));
    render(<Home/>);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch the articles/i)).toBeInTheDocument();
    });
  });

  test("display no article message when API return empty array", async () => {
    fetchArticles.mockResolvedValue([]);
    render(<Home/>);

    await waitFor(() => {
      expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
    })
  })

  test("Search bar triggers article search on input", async () => {
    const mockArticles = [
      { _id: "1", headline: { main: "Article 1" }, byline: { original: "Author 1" }, pub_date: "2024-01-01", lead_paragraph: "Article lead paragraph" },
    ];
    fetchArticles.mockResolvedValue(mockArticles);
    render(<Home/>);

    const searchInput = screen.getByPlaceholderText(/Search articles.../i);
    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: "React" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
    });

    expect(screen.getAllByRole("article")).toHaveLength(mockArticles.length);
  });

  test("loading indicator during API call", async () => {
    mockFetchArticles()

    render(<Home/>);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    }, { timeout: 1500 });

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();

  });

});

